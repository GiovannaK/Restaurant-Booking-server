const Booking = require('../models/Booking');
const sendEmail = require('../modules/mailer.js');

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
    const booking = await Booking.findById(req.params.id).populate('user').populate('restaurant').populate('specialDate');
    if (!booking) {
      return res.status(400).json({
        success: false,
        message: 'Booking does not exists',
        status: 400,
      });
    }
    booking.approved = true;

    await booking.save();

    const message = `
      <h1>Sua solicitação de reserva em ${booking.restaurant.companyName} </h1>
      <h4> Sua solicitação de reserva foi aprovada aqui estão as informações.
      </h4>
      <h5>
        Nome do restaurante: ${booking.restaurant.companyName}
        Reserva para o dia: ${booking.date.toLocaleDateString('pt-br')}
        <hr>
        Mesa para ${booking.table} pessoas
      </h5>
    `;

    try {
      await sendEmail({
        to: booking.user.email,
        subject: 'GetYourTable - Solicitação de reserva',
        text: message,
      });

      return res.status(200).json({
        success: true,
        message: 'Email sent',
        booking,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Email could be not sent',
        status: 500,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Cannot show booking',
      status: 400,
    });
  }
};

exports.reject = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user').populate('specialDate').populate('restaurant');

    if (!booking) {
      return res.status(400).json({
        success: false,
        message: 'Booking does not exists',
        status: 400,
      });
    }
    booking.approved = false;

    await booking.save();

    const message = `
      <h1>Sua solicitação de reserva em ${booking.restaurant.companyName} </h1>
      <h4> Sentimos muito, sua solicitação de reserva foi <strong>rejeitada</strong>.
      </h4>
      <h5>
        Nome do restaurante: ${booking.restaurant.companyName}
        Reserva para o dia: ${booking.date.toLocaleDateString('pt-br')}
        <hr>
        Mesa para ${booking.table} pessoas
      </h5>
    `;

    try {
      await sendEmail({
        to: booking.user.email,
        subject: 'GetYourTable - Solicitação de reserva',
        text: message,
      });

      return res.status(200).json({
        success: true,
        message: 'Email sent',
        booking,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Email could be not sent',
        status: 500,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Cannot show booking',
      status: 400,
    });
  }
};
