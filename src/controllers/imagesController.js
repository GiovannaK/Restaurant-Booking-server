/* eslint-disable no-unused-vars */
const Images = require('../models/Images');

exports.upload = async (req, res) => {
  try {
    const {
      originalname: name, size, key, url = '',
    } = req.file;

    const { restaurantId } = req.params;

    const image = await Images.create({
      name,
      size,
      key,
      url,
      restaurant: restaurantId,
    });

    await image.populate('restaurant').execPopulate();

    return res.status(200).json({
      success: true,
      message: 'Uploaded successful',
      status: 200,
      image,
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
