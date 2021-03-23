const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  comment: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model('Review', ReviewSchema);
