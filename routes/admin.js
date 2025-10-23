const express = require('express');
const User = require('../models/User');
const Booking = require('../models/Booking');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/admin/overview
// @desc    Basic stats for admin dashboard
// @access  Private/Admin
router.get('/overview', auth, adminAuth, async (req, res) => {
  try {
    const [totalUsers, totalHotels, totalBookings, latestBookings] = await Promise.all([
      User.countDocuments({}),
      User.countDocuments({ role: 'hotel' }),
      Booking.countDocuments({}),
      Booking.find({}).sort({ createdAt: -1 }).limit(10).populate('user', 'name email').lean(),
    ]);

    res.json({
      success: true,
      data: {
        totals: { users: totalUsers, hotels: totalHotels, bookings: totalBookings },
        latestBookings,
      },
    });
  } catch (err) {
    console.error('Admin overview error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch overview' });
  }
});

// @route   GET /api/admin/hotels
// @desc    List hotel owners
// @access  Private/Admin
router.get('/hotels', auth, adminAuth, async (req, res) => {
  try {
    const hotels = await User.find({ role: 'hotel' }).sort({ createdAt: -1 }).select('name email createdAt lastLogin isActive').lean();
    res.json({ success: true, data: hotels });
  } catch (err) {
    console.error('Admin hotels list error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch hotels' });
  }
});

// @route   GET /api/admin/users
// @desc    List users (guests)
// @access  Private/Admin
router.get('/users', auth, adminAuth, async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } }).sort({ createdAt: -1 }).select('name email role createdAt lastLogin isActive').lean();
    res.json({ success: true, data: users });
  } catch (err) {
    console.error('Admin users list error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
});

// @route   GET /api/admin/bookings
// @desc    List bookings
// @access  Private/Admin
router.get('/bookings', auth, adminAuth, async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 }).populate('user', 'name email').lean();
    res.json({ success: true, data: bookings });
  } catch (err) {
    console.error('Admin bookings list error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
});

module.exports = router;
