const mongoose = require('mongoose');
const { isInt } = require('validator');

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
    validate: {
      validator(price) {
        return isInt(String(price));
      },
      message: 'Price must be integer',
    },
  },
  priceCents: {
    type: Number,
    required: [true, 'cent is required'],
    min: [0, 'cent cannot be negative'],
    validate: {
      validator(priceCents) {
        return isInt(String(priceCents));
      },
      message: 'Cent must be integer',
    },
  },
  description: {
    type: String,
  },

  isAvailable: {
    type: Boolean,
    default: true,
  },

  menuCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuCategory',
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  },

},
{
  timestamps: true,
});

module.exports = mongoose.model('Menu', MenuSchema);
