/* eslint-disable no-unused-vars */
const Images = require('../models/Images');

exports.store = async (req, res) => {
  try {
    const {
      originalname: name, size, key, url = '',
    } = req.file;

    const image = await Images.create({
      name,
      size,
      key,
      url,
    });

    return res.status(200).json({
      success: true,
      message: 'Uploaded successful',
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: 'Upload fail',
      status: 500,
    });
  }
};
