const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Images', ImageSchema);
