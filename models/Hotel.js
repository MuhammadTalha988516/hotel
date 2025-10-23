const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hotel name is required'],
    trim: true,
    maxlength: [100, 'Hotel name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Hotel description is required'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: 'Hotel image'
    }
  }],
  location: {
    address: {
      type: String,
      required: [true, 'Address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    country: {
      type: String,
      required: [true, 'Country is required']
    },
    zipCode: {
      type: String,
      required: [true, 'Zip code is required']
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  amenities: [{
    name: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    description: String
  }],
  rooms: [{
    type: {
      type: String,
      required: true,
      enum: ['standard', 'deluxe', 'suite', 'presidential']
    },
    name: {
      type: String,
      required: true
    },
    description: String,
    images: [String],
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    },
    capacity: {
      adults: {
        type: Number,
        required: true,
        min: 1
      },
      children: {
        type: Number,
        default: 0
      }
    },
    amenities: [String],
    available: {
      type: Boolean,
      default: true
    }
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      maxlength: [500, 'Review cannot be more than 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  policies: {
    checkIn: {
      type: String,
      default: '3:00 PM'
    },
    checkOut: {
      type: String,
      default: '11:00 AM'
    },
    cancellation: {
      type: String,
      default: 'Free cancellation up to 24 hours before check-in'
    },
    pets: {
      type: Boolean,
      default: false
    },
    smoking: {
      type: Boolean,
      default: false
    }
  },
  contact: {
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    website: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Calculate average rating
hotelSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.rating.average = 0;
    this.rating.count = 0;
  } else {
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.rating.average = Math.round((sum / this.reviews.length) * 10) / 10;
    this.rating.count = this.reviews.length;
  }
  return this.save();
};

// Add review
hotelSchema.methods.addReview = function(userId, rating, comment) {
  this.reviews.push({
    user: userId,
    rating,
    comment
  });
  return this.calculateAverageRating();
};

module.exports = mongoose.model('Hotel', hotelSchema);
