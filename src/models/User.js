import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const {isEmail} = validator;

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    minlength: [3, 'First Name must have at least 3 characters'],
    maxlength: [50, 'First Name is too long'],
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    minlength: [3, 'Last Name must have at least 3 characters'],
    maxlength: [50, 'Last Name is too long'],
  },
  email: {
    type: String,
    unique: [true, 'Email must be unique'],
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    validate: [isEmail, 'Invalid email'],
    minlength: [3, 'Email must have at least 3 characters'],
    maxlength: [255, 'Email is too long'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must have at least 8 characters'],
    maxlength: [255, 'Password is too long'],
    select: false,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },
  emailConfirmationToken: {
    type: String,
    select: false,
  },
  emailConfirmationExpires: {
    type: Date,
    select: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  timestamps: true,
});

UserSchema.pre('save', async function(next){
  if(this.password && this.isModified('password')){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash
    next();
  }
});

UserSchema.methods.passwordMatch = async function (password){
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model('User', UserSchema);
