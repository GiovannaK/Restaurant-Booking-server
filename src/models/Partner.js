const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const crypto  = require('crypto');

const isEmail = validator.isEmail();

const PartnerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'first name is required'],
    minlength: [3, 'first name must have at least 3 characters'],
    maxlength: [255, 'first name is too long'],
  },

  lastName: {
    type: String,
    required: [true, 'last name is required'],
    minlength: [3, 'last name must have at least 3 characters'],
    maxlength: [255, 'last name is too long'],
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
    select: false,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must have at least 8 characters'],
    maxlength: [255, 'Password is too long'],
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

},
  {
    timestamps: true
  }
);

PartnerSchema.pre('save', async function(next){
  if(this.password && this.isModified('password')){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash
    next();
  }
});

PartnerSchema.methods.passwordMatch = async function (password){
  return await bcrypt.compare(password, this.password);
};

PartnerSchema.methods.generateResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.passwordResetToken = resetToken

  this.passwordResetExpires = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

PartnerSchema.methods.generateConfirmationToken = function () {
  const confirmationToken = crypto.randomBytes(20).toString("hex");

  this.emailConfirmationToken = confirmationToken

  this.emailConfirmationExpires = Date.now() + 10 * (60 * 1000);

  return confirmationToken;
};

export default mongoose.model('Restaurant', PartnerSchema);
