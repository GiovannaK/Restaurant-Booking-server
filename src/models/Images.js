/* eslint-disable consistent-return */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const s3 = new aws.S3();

const ImageSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
},

{
  timestamps: true,
});

ImageSchema.pre('save', function () {
  if (!this.url) {
    this.url = `${process.env.BACKEND_URL}/files/${this.key}`;
  }
});

ImageSchema.pre('remove', function () {
  if (process.env.STORAGE_TYPE === 's3') {
    return s3.deleteObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: this.key,
    }).promise();
  }
  return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'temp', 'uploads', this.key));
});

module.exports = mongoose.model('Images', ImageSchema);
