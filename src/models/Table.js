import mongoose from 'mongoose';

const TableSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: [true, 'Table number identification is required'],
    min: [1, 'Table identification cannot be negative'],
  },

  capacity: {
    type: Number,
    required: [true, 'price is required'],
    min: [1, 'Capacity cannot be negative'],
  },

  isAvailable: {
    type: Boolean,
    default: true,
  },

  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  }

},
  {
    timestamps: true
  }
);

export default mongoose.model('Table', TableSchema);
