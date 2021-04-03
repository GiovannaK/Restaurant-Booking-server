const Booking = require('../models/Booking');

exports.index = async (req, res) => {
  try {
    const userBookings = await Booking.find({
      user: req.userId,
    }).populate('review').populate('specialDate')
      .populate('restaurant');

    if (!userBookings) {
      return res.status(200).json(null);
    }

    return res.status(200).json({
      success: true,
      userBookings,
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Cannot show user bookings',
      status: 200,
    });
  }
};

exports.show = async (req, res) => {
  try {
    const userBooking = await Booking.findById(req.params.id).populate('review');

    if (!userBooking) {
      return res.status(400).json({
        success: false,
        message: 'user booking does not exists',
        status: 400,
      });
    }

    return res.status(200).json({
      success: true,
      userBooking,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Cannot show this user booking',
      status: 400,
    });
  }
};
