const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // guest
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: false }, // optional if you model hotels separately
    hotelName: { type: String, trim: true },
    roomId: { type: String, required: false },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: {
      adults: { type: Number, default: 1 },
      children: { type: Number, default: 0 },
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    totalPrice: { type: Number, default: 0 },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
