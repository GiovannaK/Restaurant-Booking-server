const mongoose = require('mongoose');

const RestaurantCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must have at least 3 characters'],
    maxlength: [50, 'Name is too long'],
  },

},
{
  timestamps: true,
});

module.exports = mongoose.model('RestaurantCategory', RestaurantCategorySchema);
