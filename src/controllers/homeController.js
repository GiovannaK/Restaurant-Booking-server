const Booking = require('../models/Booking');
const Restaurant = require('../models/Restaurant');

exports.index = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate('images')
      .populate('restaurantCategory');

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

exports.search = async (req, res) => {
  try {
    const { q } = req.query;
    const resultSearch = await Restaurant.find({
      $or: [
        { companyName: { $regex: new RegExp(q, 'i') } },
      ],
    });

    if (!resultSearch) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant not found',
        status: 400,
      });
    }

    return res.status(200).json({
      success: true,
      resultSearch,
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Cannot search',
      status: 400,
    });
  }
};

exports.show = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate('images');

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

exports.showReview = async (req, res) => {
  try {
    const restaurantBookingReviews = await Booking.find({
      restaurant: req.params.restaurantId,
    }).populate('review').populate('user');

    if (!restaurantBookingReviews) {
      return res.status(200).json(null);
    }

    return res.status(200).json({
      success: true,
      restaurantBookingReviews,

      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Cannot found reviews for this restaurant',
      status: 400,
    });
  }
};
