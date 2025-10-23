const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { sendMail } = require('../utils/mailer');

const router = express.Router();

const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

const getClientUrl = () => process.env.CLIENT_URL || 'http://localhost:5173';
const adminEmail = () => process.env.ADMIN_EMAIL || process.env.FROM_EMAIL;

// @route   POST /api/hotel-auth/register
// @desc    Register a new hotel account
// @access  Public
router.post(
  '/register',
  [
    body('name').trim().isLength({ min: 2, max: 80 }).withMessage('Hotel contact name must be between 2 and 80 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('company').optional().isObject().withMessage('Company must be an object'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
      }

      const { name, email, password, company } = req.body;

      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(400).json({ success: false, message: 'Account already exists with this email' });
      }

      const user = new User({
        name,
        email,
        password,
        role: 'hotel',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f59e0b&color=fff`,
        company: company ? {
          name: company.name,
          phone: company.phone,
          website: company.website,
          registrationNumber: company.registrationNumber,
          address: company.address ? { ...company.address } : undefined,
        } : undefined,
      });
      await user.save();

      const token = generateToken(user._id);

      // Send email to hotel
      const hotelLoginUrl = `${getClientUrl()}/hotel/login`;
      try {
        await sendMail({
          to: email,
          subject: 'LuxeStay — We are verifying your hotel details',
          text: `Thank you for registering your hotel with LuxeStay. Our team is verifying your details. You can sign in anytime at ${hotelLoginUrl}.`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111">
              <h2>Welcome to LuxeStay</h2>
              <p>Hi ${name},</p>
              <p>Thanks for registering your hotel on LuxeStay. Our team is verifying your details. We'll notify you once the review is complete.</p>
              <p>You can access your hotel account anytime:</p>
              <p><a href="${hotelLoginUrl}" style="background:#10b981;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;display:inline-block">Go to Hotel Login</a></p>
              <p style="color:#555">If the button doesn't work, copy and paste this link into your browser:<br/>${hotelLoginUrl}</p>
              <hr/>
              <p style="font-size:12px;color:#666">LuxeStay</p>
            </div>
          `,
        });
      } catch (e) {
        // Continue even if email fails; log on server
        console.error('Failed sending hotel email:', e);
      }

      // Notify admin
      try {
        const admin = adminEmail();
        if (admin) {
          await sendMail({
            to: admin,
            subject: 'New Hotel Registration — LuxeStay',
            text: `A new hotel account has registered. Contact: ${name}, Email: ${email}${company?.name ? `, Hotel: ${company.name}` : ''}`,
            html: `
              <div style="font-family: Arial, sans-serif; line-height:1.6; color:#111">
                <h3>New Hotel Registration</h3>
                <ul>
                  <li><b>Contact:</b> ${name}</li>
                  <li><b>Email:</b> ${email}</li>
                  ${company?.name ? `<li><b>Hotel:</b> ${company.name}</li>` : ''}
                  ${company?.phone ? `<li><b>Phone:</b> ${company.phone}</li>` : ''}
                  ${company?.website ? `<li><b>Website:</b> ${company.website}</li>` : ''}
                  ${company?.registrationNumber ? `<li><b>Registration #:</b> ${company.registrationNumber}</li>` : ''}
                  ${company?.address ? `<li><b>Address:</b> ${[company.address.street, company.address.city, company.address.state, company.address.zipCode, company.address.country].filter(Boolean).join(', ')}</li>` : ''}
                  <li><b>Registered At:</b> ${new Date().toISOString()}</li>
                </ul>
              </div>
            `,
          });
        }
      } catch (e) {
        console.error('Failed sending admin email:', e);
      }

      res.status(201).json({
        success: true,
        message: 'Hotel account registered successfully',
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
      });
    } catch (error) {
      console.error('Hotel register error:', error);
      res.status(500).json({ success: false, message: 'Server error during hotel registration' });
    }
  }
);

// @route   POST /api/hotel-auth/login
// @desc    Login hotel account
// @access  Public
router.post(
  '/login',
  [body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'), body('password').exists().withMessage('Password is required')],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email }).select('+password');
      if (!user || user.role !== 'hotel') {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
      if (!user.isActive) {
        return res.status(401).json({ success: false, message: 'Account has been deactivated' });
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const token = generateToken(user._id);
      await user.updateLastLogin();

      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
      });
    } catch (error) {
      console.error('Hotel login error:', error);
      res.status(500).json({ success: false, message: 'Server error during hotel login' });
    }
  }
);

module.exports = router;
