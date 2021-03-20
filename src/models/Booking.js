const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  hours: {
    type: Number,
    min: [0, 'Hour cannot be less than 0'],
    max: [23, 'Hour cannot be greather than 23'],
    required: true,
  },
  minutes: {
    type: Number,
    min: [0, 'Minute cannot be less than 0'],
    max: [59, 'Minute cannot be greather than 59'],
    required: true,
  },
  date: {
    type: Date,
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
