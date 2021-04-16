const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  hours: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  extras: {
    type: String,
  },
  table: {
    type: Number,
    required: true,
  },
  approved: {
    type: Boolean,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  specialDate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SpecialDate',
  },
  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model('Booking', BookingSchema);
