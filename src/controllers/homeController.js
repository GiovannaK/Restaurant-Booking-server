const Restaurant = require('../models/Restaurant');
const Review = require('../models/Review');

exports.index = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await Restaurant.countDocuments();
    const pages = Math.ceil(total / pageSize);

    const restaurants = await Restaurant.find().skip(skip).limit(pageSize);

    if (!restaurants) {
      return res.status(400).json({
        success: false,
        message: 'Cannot found restaurants',
        status: 400,
      });
    }

    if (page > pages) {
      return res.status(400).json({
        success: false,
        message: 'Page does not exists',
        status: 400,
      });
    }

    return res.status(200).json({
      success: true,
      restaurants,
      page,
      pages,
      total,
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

exports.showReview = async (req, res) => {
  try {
    const restaurantBookingReviews = await Review.find({
      restaurant: req.params.restaurantId,
    }).populate('booking');

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
