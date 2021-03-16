/* eslint-disable no-return-await */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { cnpj } = require('cpf-cnpj-validator');
const { isMobilePhone } = require('validator');

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

  mobilePhone: {
    type: Number,
    validate: {
      validator(phoneNumber) {
        return isMobilePhone(String(phoneNumber), 'pt-BR');
      },
      message: 'Invalid mobile phone number',
    },
    trim: true,
    required: [true, 'mobile phone number is required'],
    unique: [true, 'mobile phone number must be unique'],
  },

  phone: {
    type: String,
    minlength: [10, 'Invalid phone number'],
    maxlength: [10, 'Invalid phone number'],
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

  /* openingHours: {
    monday: {
      startHours: {
        type: Number,
        min: [0, 'start hour cannot be less than 0'],
        max: [23, 'start hour cannot be greather than 23'],
      },
      endHours: {
        type: Number,
        min: [0, 'end hour cannot be less than 0'],
        max: [23, 'end hour cannot be greather than 23'],
      },
      startMinutes: {
        type: Number,
        min: [0, 'start minute cannot be less than 0'],
        max: [59, 'start minute cannot be greather than 59'],
      },
      endMinutes: {
        type: Number,
        min: [0, 'end minute cannot be less than 0'],
        max: [59, 'end minute cannot be greather than 59'],
      }
    },
    tuesday: {
      startHours: {
        type: Number,
        min: [0, 'start hour cannot be less than 0'],
        max: [23, 'start hour cannot be greather than 23'],
      },
      endHours: {
        type: Number,
        min: [0, 'end hour cannot be less than 0'],
        max: [23, 'end hour cannot be greather than 23'],
      },
      startMinutes: {
        type: Number,
        min: [0, 'start minute cannot be less than 0'],
        max: [59, 'start minute cannot be greather than 59'],
      },
      endMinutes: {
        type: Number,
        min: [0, 'end minute cannot be less than 0'],
        max: [59, 'end minute cannot be greather than 59'],
      }
    },
    wednesday: {
      startHours: {
        type: Number,
        min: [0, 'start hour cannot be less than 0'],
        max: [23, 'start hour cannot be greather than 23'],
      },
      endHours: {
        type: Number,
        min: [0, 'end hour cannot be less than 0'],
        max: [23, 'end hour cannot be greather than 23'],
      },
      startMinutes: {
        type: Number,
        min: [0, 'start minute cannot be less than 0'],
        max: [59, 'start minute cannot be greather than 59'],
      },
      endMinutes: {
        type: Number,
        min: [0, 'end minute cannot be less than 0'],
        max: [59, 'end minute cannot be greather than 59'],
      }
    },
    thursday: {
      startHours: {
        type: Number,
        min: [0, 'start hour cannot be less than 0'],
        max: [23, 'start hour cannot be greather than 23'],
      },
      endHours: {
        type: Number,
        min: [0, 'end hour cannot be less than 0'],
        max: [23, 'end hour cannot be greather than 23'],
      },
      startMinutes: {
        type: Number,
        min: [0, 'start minute cannot be less than 0'],
        max: [59, 'start minute cannot be greather than 59'],
      },
      endMinutes: {
        type: Number,
        min: [0, 'end minute cannot be less than 0'],
        max: [59, 'end minute cannot be greather than 59'],
      }
    },
    friday: {
      startHours: {
        type: Number,
        min: [0, 'start hour cannot be less than 0'],
        max: [23, 'start hour cannot be greather than 23'],
      },
      endHours: {
        type: Number,
        min: [0, 'end hour cannot be less than 0'],
        max: [23, 'end hour cannot be greather than 23'],
      },
      startMinutes: {
        type: Number,
        min: [0, 'start minute cannot be less than 0'],
        max: [59, 'start minute cannot be greather than 59'],
      },
      endMinutes: {
        type: Number,
        min: [0, 'end minute cannot be less than 0'],
        max: [59, 'end minute cannot be greather than 59'],
      }
    },
    saturday: {
      startHours: {
        type: Number,
        min: [0, 'start hour cannot be less than 0'],
        max: [23, 'start hour cannot be greather than 23'],
      },
      endHours: {
        type: Number,
        min: [0, 'end hour cannot be less than 0'],
        max: [23, 'end hour cannot be greather than 23'],
      },
      startMinutes: {
        type: Number,
        min: [0, 'start minute cannot be less than 0'],
        max: [59, 'start minute cannot be greather than 59'],
      },
      endMinutes: {
        type: Number,
        min: [0, 'end minute cannot be less than 0'],
        max: [59, 'end minute cannot be greather than 59'],
      }
    },
    sunday: {
      startHours: {
        type: Number,
        min: [0, 'start hour cannot be less than 0'],
        max: [23, 'start hour cannot be greather than 23'],
      },
      endHours: {
        type: Number,
        min: [0, 'end hour cannot be less than 0'],
        max: [23, 'end hour cannot be greather than 23'],
      },
      startMinutes: {
        type: Number,
        min: [0, 'start minute cannot be less than 0'],
        max: [59, 'start minute cannot be greather than 59'],
      },
      endMinutes: {
        type: Number,
        min: [0, 'end minute cannot be less than 0'],
        max: [59, 'end minute cannot be greather than 59'],
      }
    },
  }, */
  isOpen: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  /* restaurantCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RestaurantCategory'
  }, */

},
{
  timestamps: true,
});

RestaurantSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  }
});

RestaurantSchema.methods.passwordMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
};

RestaurantSchema.methods.generateResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  this.passwordResetToken = resetToken;

  this.passwordResetExpires = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

RestaurantSchema.methods.generateConfirmationToken = function () {
  const confirmationToken = crypto.randomBytes(20).toString('hex');

  this.emailConfirmationToken = confirmationToken;

  this.emailConfirmationExpires = Date.now() + 10 * (60 * 1000);

  return confirmationToken;
};

module.exports = mongoose.model('Restaurant', RestaurantSchema);
