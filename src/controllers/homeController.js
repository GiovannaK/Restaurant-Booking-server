const Restaurant = require('../models/Restaurant');

exports.index = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});

    if (!restaurants) {
      return res.status(400).json({
        success: false,
        message: 'Cannot found restaurants',
        status: 400,
      });
    }

    return res.status(200).json({
      success: true,
      restaurants,
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Cannot show restaurants',
      status: 400,
    });
  }
};

exports.show = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(400).json({
        success: false,
        message: 'Cannot found restaurant',
        status: 400,
      });
    }

    return res.status(200).json({
      success: true,
      restaurant,
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Cannot show restaurant',
      status: 400,
    });
  }
};
