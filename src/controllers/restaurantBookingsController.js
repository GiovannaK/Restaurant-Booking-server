const Booking = require('../models/Booking');

exports.index = async (req, res) => {
  try {
    const restaurantBooking = await Booking.find({
      restaurant: req.params.restaurantId,
    }).populate('user');

    if (!restaurantBooking) {
      return res.status(400).json({
        success: false,
        message: 'Current restaurant has no bookings',
        status: 400,
      });
    }

    return res.status(200).json({
      success: true,
      restaurantBooking,
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Cannot show bookings for this restaurant',
      status: 400,
    });
  }
};

exports.approval = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user').populate('user').populate('restaurant');

    if (!booking) {
      return res.status(400).json({
        success: false,
        message: 'Booking does not exists',
        status: 400,
      });
    }
    booking.approved = true;

    await booking.save();

    return res.status(200).json({
      success: true,
      booking,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Cannot show booking',
      status: 400,
    });
  }
};

exports.reject = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user').populate('user').populate('restaurant');

    if (!booking) {
      return res.status(400).json({
        success: false,
        message: 'Booking does not exists',
        status: 400,
      });
    }
    booking.approved = false;

    await booking.save();

    return res.status(200).json({
      success: true,
      booking,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Cannot show booking',
      status: 400,
    });
  }
};
