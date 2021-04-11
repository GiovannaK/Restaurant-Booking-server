/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-return-await */
const mongoose = require('mongoose');
const { cnpj } = require('cpf-cnpj-validator');
const PointSchema = require('./utils/PointSchema');

const RestaurantSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company Name is required'],
    minlength: [3, 'Company Name must have at least 1 characters'],
    maxlength: [255, 'Company Name is too long'],
  },
  cnpj: {
    type: String,
    required: [true, 'CNPJ is required'],
    validate: [cnpj.isValid, 'Invalid cnpj'],
  },

  phone: {
    type: Number,
    min: [10, 'Invalid phone number'],
    required: [true, 'Phone is required'],
    unique: [true, 'phone number must be unique'],
  },

  isWifi: {
    type: Boolean,
    default: false,
  },

  isParking: {
    type: Boolean,
    default: false,
  },

  capacity: {
    type: Number,
    min: [1, 'Your restaurant must have capacity for at least 1 person'],
    required: [true, 'Capacity is required'],
  },
  businessDayStartHours: {
    type: String,
    required: [true, 'A business Day start hour is required'],
  },
  businessDayFinalHours: {
    type: String,
    required: [true, 'A business Day final hour is required'],
  },
  weekendStartHours: {
    type: String,
    required: [true, 'A weekend start hour is required'],
  },
  weekendFinalHours: {
    type: String,
    required: [true, 'A weekend final hour is required'],
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  restaurantCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RestaurantCategory',
    required: true,
  },
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Images',
    },
  ],
  location: {
    type: PointSchema,
    index: '2dsphere',
  },
  address: {
    type: String,
    required: true,
    minlength: [3, 'Invalid address'],
    maxlength: [255, 'Invalid address'],
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
