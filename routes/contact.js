const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { auth, adminAuth } = require('../middleware/auth');
const { sendMail } = require('../utils/mailer');

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('subject')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Subject must be between 5 and 100 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters'),
  body('phone')
    .optional()
    .trim()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('targetAdminEmail')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid admin email')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, phone, subject, message, targetAdminEmail } = req.body;

    // Create new contact submission
    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
      targetAdminEmail: targetAdminEmail || undefined
    });

    await contact.save();

    // determine admin recipient (body override -> ADMIN1_EMAIL -> ADMIN_EMAIL)
    const defaultAdmin = process.env.ADMIN1_EMAIL || process.env.ADMIN_EMAIL;
    const adminRecipient = (targetAdminEmail && String(targetAdminEmail).trim()) || defaultAdmin;

    // Send email to admin
    if (adminRecipient) {
      try {
        await sendMail({
          to: adminRecipient,
          subject: `[Contact] ${subject} — ${name}`,
          text: `New contact submission\nName: ${name}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ''}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
              <h3>New contact submission</h3>
              <ul>
                <li><b>Name:</b> ${name}</li>
                <li><b>Email:</b> ${email}</li>
                ${phone ? `<li><b>Phone:</b> ${phone}</li>` : ''}
                ${adminRecipient !== process.env.ADMIN_EMAIL ? `<li><b>Target Admin Email:</b> ${adminRecipient}</li>` : ''}
              </ul>
              <p><b>Subject:</b> ${subject}</p>
              <p style="white-space:pre-wrap">${message}</p>
              <hr/>
              <p style="font-size:12px;color:#666">Contact ID: ${contact._id}</p>
            </div>
          `,
        });
      } catch (e) {
        console.error('Contact admin email error:', e);
      }
    }

    // Send confirmation to sender
    try {
      await sendMail({
        to: email,
        subject: 'LuxeStay — We received your message',
        text: `Hi ${name},\n\nThanks for contacting LuxeStay. We have received your message and will get back to you shortly.\n\nSubject: ${subject}\n\nYour message:\n${message}\n\nBest regards,\nLuxeStay Support`,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
            <p>Hi ${name},</p>
            <p>Thanks for contacting <b>LuxeStay</b>. We have received your message and will get back to you shortly.</p>
            <p><b>Subject:</b> ${subject}</p>
            <p style="white-space:pre-wrap">${message}</p>
            <p style="margin-top:16px">Best regards,<br/>LuxeStay Support</p>
          </div>
        `,
      });
    } catch (e) {
      console.error('Contact sender confirmation email error:', e);
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon!',
      contactId: contact._id
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
});

// @route   GET /api/contact
// @desc    Get all contact submissions (Admin only)
// @access  Private/Admin
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      priority,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = {};
    
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const contacts = await Contact.find(query)
      .populate('assignedTo', 'name email')
      .populate('response.respondedBy', 'name email')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Contact.countDocuments(query);

    // Get statistics
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
          limit: parseInt(limit)
        },
        stats: stats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {})
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
});

// @route   GET /api/contact/:id
// @desc    Get single contact submission (Admin only)
// @access  Private/Admin
router.get('/:id', auth, adminAuth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('response.respondedBy', 'name email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    // Mark as read if not already
    if (!contact.isRead) {
      await contact.markAsRead();
    }

    res.json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact'
    });
  }
});

// @route   PUT /api/contact/:id/status
// @desc    Update contact status (Admin only)
// @access  Private/Admin
router.put('/:id/status', auth, adminAuth, [
  body('status')
    .isIn(['new', 'in-progress', 'resolved', 'closed'])
    .withMessage('Invalid status'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Invalid priority')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { status, priority, assignedTo } = req.body;

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    // Update fields
    if (status) contact.status = status;
    if (priority) contact.priority = priority;
    if (assignedTo) contact.assignedTo = assignedTo;

    await contact.save();

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact status'
    });
  }
});

// @route   POST /api/contact/:id/response
// @desc    Add response to contact (Admin only)
// @access  Private/Admin
router.post('/:id/response', auth, adminAuth, [
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Response message must be between 10 and 1000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { message } = req.body;

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    await contact.addResponse(message, req.user.userId);

    // TODO: Send email response to user
    // await sendContactResponse(contact);

    res.json({
      success: true,
      message: 'Response added successfully',
      data: contact
    });

  } catch (error) {
    console.error('Add contact response error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add response'
    });
  }
});

module.exports = router;
