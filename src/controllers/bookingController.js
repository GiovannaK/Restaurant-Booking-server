/* eslint-disable no-underscore-dangle */
const moment = require('moment');
const Booking = require('../models/Booking');
const Restaurant = require('../models/Restaurant');
const sendEmail = require('../modules/mailer.js');

exports.store = async (req, res) => {
  try {
    const newBooking = await Booking.create({
      ...req.body,
      restaurant: req.params.restaurantId,
      user: req.userId,
    });

    await newBooking.populate('restaurant').populate('user').populate('specialDate').execPopulate();
    const getRestaurantOwner = await Restaurant.findById(req.params.restaurantId).populate('user');

    if (!newBooking) {
      return res.status(400).json({
        success: false,
        message: 'Cannot create booking',
        status: 400,
      });
    }

    const ownerRestaurantSocket = req.connectedUsers[getRestaurantOwner.user._id];

    if (ownerRestaurantSocket) {
      req.io.to(ownerRestaurantSocket).emit('booking_request', newBooking);
    }

    const message = `
      <h1>Sua solicitação de reserva foi enviada para ${newBooking.restaurant.companyName} </h1>
      <h4> Você reberá informações por e-mail caso sua reserva seja aprovada ou rejeitada.
        Aqui estão as informações.
      </h4>
      <h5>
        Nome do restaurante: ${newBooking.restaurant.companyName}
        Reserva para o dia: ${moment(newBooking.date).format('DD/MM/YYYY')}
        <hr>
        Mesa para ${newBooking.table} pessoas
      </h5>
    `;
    try {
      await sendEmail({
        to: newBooking.user.email,
        subject: 'GetYourTable - Solicitação de reserva',
        text: message,
      });

      return res.status(200).json({
        success: true,
        message: 'Email sent',
        newBooking,
        getRestaurantOwner,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'Email could be not sent',
        status: 500,
      });
    }
  } catch (error) {
    console.log(error);
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
