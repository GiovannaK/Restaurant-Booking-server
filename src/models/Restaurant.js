import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import crypto from 'crypto';
import {cnpj} from 'cpf-cnpj-validator';

const {isEmail, isMobilePhone} = validator;

const RestaurantSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company Name is required'],
    minlength: [3, 'Company Name must have at least 1 characters'],
    maxlength: [255, 'Company Name is too long'],
  },
  cnpj: {
    type: Number,
    required: [true, 'CNPJ is required'],
    validate: [cnpj.isValid, 'Invalid cnpj']
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
  phone: {
    type: Number,
    validate: {
      validator: function(phoneNumber){
        return isMobilePhone(String(phoneNumber), 'pt-BR');
      },
      message: 'Invalid phone number'
    },
    trim: true,
    required: [true, 'Phone number is required'],
    unique: [true, 'Phone number must be unique']
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
    required: [true, 'Capacity is required']
  },

  openingHours: {
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
    isOpen: {
      type: Boolean,
      default: false,
    },
    images: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Images',
    },
  }

},
  {
    timestamps: true
  }
);

RestaurantSchema.pre('save', async function(next){
  if(this.password && this.isModified('password')){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash
    next();
  }
});

RestaurantSchema.methods.passwordMatch = async function (password){
  return await bcrypt.compare(password, this.password);
};

RestaurantSchema.methods.generateResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.passwordResetToken = resetToken

  this.passwordResetExpires = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

RestaurantSchema.methods.generateConfirmationToken = function () {
  const confirmationToken = crypto.randomBytes(20).toString("hex");

  this.emailConfirmationToken = confirmationToken

  this.emailConfirmationExpires = Date.now() + 10 * (60 * 1000);

  return confirmationToken;
};

export default mongoose.model('Restaurant', RestaurantSchema);
