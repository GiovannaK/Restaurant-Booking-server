import mongoose from 'mongoose';

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

export default mongoose.model('Images', ImageSchema);
