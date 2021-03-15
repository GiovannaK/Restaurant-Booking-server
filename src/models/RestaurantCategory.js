import mongoose from 'mongoose';

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

export default mongoose.model('RestaurantCategory', RestaurantCategorySchema);
