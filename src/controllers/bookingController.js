const Booking = require('../models/Booking');

exports.store = async (req, res) => {
  try {
    const newBooking = await Booking.create({
      ...req.body,
      restaurant: req.params.restaurantId,
      user: req.userId,
    });

    await newBooking.populate('restaurant').populate('user').populate('specialDate').execPopulate();

    if (!newBooking) {
      return res.status(400).json({
        success: false,
        message: 'Cannot create booking',
        status: 400,
      });
    }

    return res.status(200).json({
      success: true,
      newBooking,
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      status: 500,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(400).json({
        success: false,
        message: 'Booking not exists',
        status: 400,
      });
    }
    const updatedBooking = await Booking.findOneAndUpdate({ _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      });

    return res.status(200).json({
      success: true,
      updatedBooking,
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Cannot update Booking',
      status: 500,
    });
  }
};
