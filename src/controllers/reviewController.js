const Review = require('../models/Review');

exports.store = async (req, res) => {
  try {
    const bookingAlreadyHaveReview = await Review.exists({
      booking: req.params.bookingId,
    });
    if (bookingAlreadyHaveReview) {
      return res.status(400).json({
        success: false,
        message: 'You already review this booking',
        status: 400,
      });
    }
    const review = await Review.create({
      ...req.body,
      booking: req.params.bookingId,
      restaurant: req.params.restaurantId,
    });

    if (!review) {
      return res.status(400).json({
        success: false,
        message: 'Cannot create review for this booking',
        status: 400,
      });
    }

    return res.status(200).json({
      success: true,
      review,
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Cannot create or return review for this booking',
      status: 400,
    });
  }
};
