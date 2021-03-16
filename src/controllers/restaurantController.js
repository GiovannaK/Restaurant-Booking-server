const Restaurant = require('../models/Restaurant');

exports.store = async (req, res) => {
  try {
    const newRestaurant = await Restaurant.create({ ...req.body, user: req.userId });
    return res.status(200).json({
      success: true,
      message: 'Restaurant created successfully',
      status: 200,
      newRestaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Cannot create restaurant',
      status: 400,
    });
  }
};
