const mongoose = require('mongoose');

const SpecialDateSchema = new mongoose.Schema({
  specialDate: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model('SpecialDate', SpecialDateSchema);
