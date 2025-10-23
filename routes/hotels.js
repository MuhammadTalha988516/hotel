const express = require('express');
const { body, validationResult } = require('express-validator');
const Hotel = require('../models/Hotel');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/hotels
// @desc    Get all hotels
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      city,
      minPrice,
      maxPrice,
      rating,
      amenities,
      featured,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = { isActive: true };
    
    if (city) query['location.city'] = { $regex: city, $options: 'i' };
    if (featured) query.featured = featured === 'true';
    if (rating) query['rating.average'] = { $gte: parseFloat(rating) };
    
    if (minPrice || maxPrice) {
      query['rooms.price'] = {};
      if (minPrice) query['rooms.price'].$gte = parseFloat(minPrice);
      if (maxPrice) query['rooms.price'].$lte = parseFloat(maxPrice);
    }

    if (amenities) {
      const amenityList = amenities.split(',');
      query['amenities.name'] = { $in: amenityList };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'location.city': { $regex: search, $options: 'i' } },
        { 'location.country': { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const hotels = await Hotel.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('reviews.user', 'name avatar');

    const total = await Hotel.countDocuments(query);

    res.json({
      success: true,
      data: {
        hotels,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get hotels error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch hotels'
    });
  }
});

// @route   GET /api/hotels/featured
// @desc    Get featured hotels
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const hotels = await Hotel.find({ 
      isActive: true, 
      featured: true 
    })
    .limit(6)
    .sort({ 'rating.average': -1 })
    .populate('reviews.user', 'name avatar');

    res.json({
      success: true,
      data: hotels
    });

  } catch (error) {
    console.error('Get featured hotels error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured hotels'
    });
  }
});

// @route   GET /api/hotels/:id
// @desc    Get single hotel
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ 
      _id: req.params.id, 
      isActive: true 
    }).populate('reviews.user', 'name avatar');

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }

    res.json({
      success: true,
      data: hotel
    });

  } catch (error) {
    console.error('Get hotel error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch hotel'
    });
  }
});

// @route   POST /api/hotels
// @desc    Create new hotel (Admin only)
// @access  Private/Admin
router.post('/', auth, adminAuth, [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Hotel name must be between 2 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('location.address')
    .trim()
    .notEmpty()
    .withMessage('Address is required'),
  body('location.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('contact.phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required'),
  body('contact.email')
    .isEmail()
    .withMessage('Valid email is required')
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

    const hotel = new Hotel(req.body);
    await hotel.save();

    res.status(201).json({
      success: true,
      message: 'Hotel created successfully',
      data: hotel
    });

  } catch (error) {
    console.error('Create hotel error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create hotel'
    });
  }
});

// @route   POST /api/hotels/:id/reviews
// @desc    Add review to hotel
// @access  Private
router.post('/:id/reviews', auth, [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Comment cannot be more than 500 characters')
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

    const { rating, comment } = req.body;

    const hotel = await Hotel.findOne({ 
      _id: req.params.id, 
      isActive: true 
    });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }

    // Check if user already reviewed this hotel
    const existingReview = hotel.reviews.find(
      review => review.user.toString() === req.user.userId
    );

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this hotel'
      });
    }

    await hotel.addReview(req.user.userId, rating, comment);

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: hotel
    });

  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add review'
    });
  }
});

module.exports = router;
