const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
},

{
  timestamps: true,
});

module.exports = mongoose.model('Images', ImageSchema);
