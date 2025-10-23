const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth, adminAuth } = require('../middleware/auth');
const Booking = require('../models/Booking');

const router = express.Router();

// Note: This is a basic booking routes structure
// You would need to create a Booking model similar to the others

// @route   GET /api/bookings
// @desc    Get user bookings or all bookings (admin)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const isAdmin = req.user && req.user.userId ? undefined : undefined; // placeholder not used
    // If admin needs all, create separate admin route; here return user's bookings
    const bookings = await Booking.find({ user: req.user.userId })
      .sort({ createdAt: -1 })
      .lean();
    res.json({ success: true, data: bookings });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
});

// @route   POST /api/bookings
// @desc    Create new booking
// @access  Private
router.post('/', auth, [
  body('hotelId').notEmpty().withMessage('Hotel ID is required'),
  body('roomId').notEmpty().withMessage('Room ID is required'),
  body('checkIn').isISO8601().withMessage('Valid check-in date is required'),
  body('checkOut').isISO8601().withMessage('Valid check-out date is required'),
  body('guests.adults').isInt({ min: 1 }).withMessage('At least 1 adult is required')
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

    const { hotelId, roomId, checkIn, checkOut, guests, totalPrice, notes, hotelName } = req.body;
    const booking = await Booking.create({
      user: req.user.userId,
      hotel: hotelId || undefined,
      roomId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests,
      status: 'pending',
      totalPrice: totalPrice || 0,
      notes,
      hotelName,
    });

    res.status(201).json({ success: true, message: 'Booking created successfully', data: booking });

  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ success: false, message: 'Failed to create booking' });
  }
});

module.exports = router;
