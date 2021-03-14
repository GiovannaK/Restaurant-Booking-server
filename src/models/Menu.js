const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must have at least 3 characters'],
    maxlength: [255, 'Name is too long'],
  },

  price: {
    type: Number,
    required: [true, 'price is required'],
    min: [0, 'Price cannot be negative'],
  },

  description: {
    type: String
  },

  isAvailable: {
    type: Boolean,
    default: true,
  },

  menuCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuCategory'
  }

},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Menu', MenuSchema);
