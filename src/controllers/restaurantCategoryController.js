const RestaurantCategory = require('../models/RestaurantCategory');
const Restaurant = require('../models/Restaurant');

exports.index = async (req, res) => {
  try {
    const restaurantCategories = await RestaurantCategory.find({});

    if (!restaurantCategories) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant Categories does not exists',
        status: 400,
      });
    }

    return res.status(200).json({
      success: true,
      restaurantCategories,
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      success: true,
      message: 'Cannot show restaurant categories',
      status: 400,
    });
  }
};

exports.show = async (req, res) => {
  try {
    const restaurantCategory = await Restaurant.find({
      restaurantCategory: req.params.id,
    });

    if (!restaurantCategory) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant category does not exists',
        status: 400,
      });
    }

    return res.status(200).json({
      success: true,
      restaurantCategory,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Cannot show this restaurant category',
      status: 400,
    });
  }
};
