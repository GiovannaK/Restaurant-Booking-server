/* eslint-disable no-unused-vars */
const Images = require('../models/Images');
const Restaurant = require('../models/Restaurant');

exports.upload = async (req, res) => {
  try {
    const {
      originalname: name, size, key, location: url = '',
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

    const restaurant = await Restaurant.findByIdAndUpdate({ _id: req.params.restaurantId },
      { $push: { images: image.id } });

    return res.status(200).json({
      success: true,
      message: 'Uploaded successful',
      status: 200,
      image,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Upload fail',
      status: 500,
    });
  }
};

exports.index = async (req, res) => {
  try {
    const images = await Images.find({ restaurant: req.params.restaurantId });

    if (!images) {
      return res.status(400).json({
        success: false,
        message: 'Images or user not found',
        status: 400,
      });
    }

    return res.status(200).json({
      success: true,
      images,
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Cannot show images',
      status: 400,
    });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await Images.findById(req.params.id);

    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'Image does not exists',
        status: 400,
      });
    }

    await image.remove();

    return res.status(200).json(null);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Cannot delete image',
      status: 500,
    });
  }
};
