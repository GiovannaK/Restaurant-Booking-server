const Restaurant = require('../models/Restaurant');

exports.store = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    const newRestaurant = await Restaurant.create({
      location,
      ...req.body,
      user: req.userId,
    });
    return res.status(200).json({
      success: true,
      message: 'Restaurant created successfully',
      status: 200,
      newRestaurant,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Cannot create restaurant',
      status: 400,
    });
  }
};

exports.index = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({
      user: req.userId,
    }).populate('images');

    if (!restaurants) {
      return res.status(400).json({
        success: false,
        message: 'No restaurant available',
        status: 400,
      });
    }

    return res.status(200).json({
      success: true,
      restaurants,
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Cannot show restaurants',
      status: 500,
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

exports.update = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant not exists',
        status: 400,
      });
    }

    const { latitude, longitude } = req.body;

    if (latitude && longitude) {
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      const updatedRestaurant = await Restaurant.findByIdAndUpdate({ _id: req.params.id },
        { ...req.body, location },
        {
          new: true,
          runValidators: true,
        });

      return res.status(200).json({
        success: true,
        updatedRestaurant,
        status: 200,
      });
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate({ _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      });
    return res.status(200).json({
      success: true,
      updatedRestaurant,
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Cannot update Restaurant',
      status: 500,
    });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant does not exists',
        status: 400,
      });
    }

    await restaurant.remove();

    return res.status(200).json(null);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Cannot delete restaurant',
      status: 500,
    });
  }
};
