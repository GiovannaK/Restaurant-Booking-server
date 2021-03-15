const jwt = require('jsonwebtoken');
const Partner = require('../models/Partner');
const sendEmail = require('../modules/mailer.js');

exports.register = async (req, res) => {
  try {
    const newPartner = await Partner.create(req.body);
    const {
      id, firstName, lastName, email,
    } = newPartner;

    const partner = await Partner.findOne({ email });

    if (!partner) {
      return res.status(400).json(
        {
          success: false,
          message: 'User does not exist',
          status: 400,
        },
      );
    }

    const accountConfirmationToken = partner.generateConfirmationToken();

    await partner.save();

    const confirmationUrl = `${process.env.BASE_URL}/session/account_confirmation/${accountConfirmationToken}`;

    const message = `
      <h1>Ative sua conta</h1>
      <h4>Você está recebendo este e-mail porque se registrou
        em nossa plataforma, clique no link abaixo para ativar sua conta.
      </h4>
      <a href=${confirmationUrl} clicktracking=off>${confirmationUrl}</a>
    `;

    try {
      await sendEmail({
        to: partner.email,
        subject: 'GetYourTable - Ative sua conta',
        text: message,
      });

      return res.status(200).json({
        success: true,
        message: 'Email sent',
        firstName,
        lastName,
        email,
        id,
      });
    } catch (error) {
      partner.emailConfirmationToken = undefined;
      partner.emailConfirmationExpires = undefined;

      await partner.save();
      return res.status(500).json({
        success: false,
        message: 'Email could be not sent',
        status: 500,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'something went wrong, already have an account?',
      status: 400,
    });
  }
};

exports.accountConfirmation = async (req, res) => {
  try {
    const partner = await Partner.findOne({ emailConfirmationToken: req.params.confirmationToken }).select('+emailConfirmationToken emailConfirmationExpires');

    if (!partner) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Token',
        status: 400,
      });
    }

    const now = Date.now();

    if (now > partner.emailConfirmationExpires) {
      return res.status(400).json({
        success: false,
        message: 'Token expired',
        status: 400,
      });
    }

    partner.isVerified = true;
    partner.emailConfirmationExpires = undefined;
    partner.emailConfirmationToken = undefined;

    await partner.save();

    return res.status(200).json({
      success: true,
      message: 'Account activated',
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Cannot verify account',
      status: 400,
    });
  }
};

exports.accountConfirmationResend = async (req, res) => {
  const { email } = req.body;

  try {
    const partner = await Partner.findOne({ email });

    if (!partner) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
        status: 400,
      });
    }

    if (partner.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'Account has already been verified',
        status: 400,
      });
    }

    const accountConfirmationToken = partner.generateConfirmationToken();

    await partner.save();

    const confirmationUrl = `${process.env.BASE_URL}/session/account_confirmation/${accountConfirmationToken}`;

    const message = `
      <h1>Ative sua conta</h1>
      <h4>Você está recebendo este e-mail porque se registrou
        em nossa plataforma, clique no link abaixo para ativar sua conta.
      </h4>
      <a href=${confirmationUrl} clicktracking=off>${confirmationUrl}</a>
    `;

    try {
      await sendEmail({
        to: partner.email,
        subject: 'GetYourTable - Ative sua conta',
        text: message,
      });

      return res.status(200).json({
        success: true,
        message: 'Email sent',
        status: 200,
      });
    } catch (error) {
      partner.emailConfirmationToken = undefined;
      partner.emailConfirmationExpires = undefined;

      await partner.save();
      return res.status(500).json({
        success: false,
        message: 'Email could be not sent',
        status: 500,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'something went wrong, already have a verified account?',
      status: 400,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        status: 401,
      });
    }

    const partner = await Partner.findOne({ email }).select('+password');

    if (!partner) {
      return res.status(400).json({
        success: false,
        message: 'User does not exist',
        status: 400,
      });
    }

    if (!partner.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'Account not verified',
        status: 400,
      });
    }

    const isPasswordMatch = await partner.passwordMatch(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email or password invalid',
        status: 401,
      });
    }

    const { id } = partner;

    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.status(200).json({
      success: true,
      status: 200,
      token,
      user: {
        id,
        email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: 'Failed to login user',
      status: 500,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const partner = await Partner.findOne({ email });

    if (!partner) {
      return res.status(400).json({
        success: false,
        message: 'No user associated with this email was found',
        status: 400,
      });
    }

    const resetPasswordToken = partner.generateResetToken();

    await partner.save();

    const resetPaswordUrl = `${process.env.BASE_URL}/session/reset_password/${resetPasswordToken}`;

    const message = `
      <h1>Altere sua senha</h1>
      <h4>Você está recebendo este e-mail porque se solicitou a alteração de senha
        em nossa plataforma, clique no link abaixo para alterar sua senha.
      </h4>
      <a href=${resetPaswordUrl} clicktracking=off>${resetPaswordUrl}</a>
    `;

    try {
      await sendEmail({
        to: partner.email,
        subject: 'GetYourTable - Altere sua senha',
        text: message,
      });

      return res.status(200).json({
        success: true,
        message: 'Email sent',
        status: 200,
      });
    } catch (error) {
      partner.passwordResetToken = undefined;
      partner.passwordResetExpires = undefined;

      await partner.save();
      return res.status(500).json({
        success: false,
        message: 'Email could be not sent',
        status: 500,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Cannot send reset password email',
      status: 500,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    const partner = await Partner.findOne({ passwordResetToken: req.params.resetToken }).select('+passwordResetToken passwordResetExpires');

    if (!partner) {
      return res.status(400).json({
        success: false,
        message: 'Account does not exist',
        status: 400,
      });
    }

    const now = new Date();

    if (now > partner.passwordResetExpires) {
      return res.status(400).json({
        success: false,
        message: 'Expired token',
        status: 400,
      });
    }

    partner.password = password;
    partner.passwordResetToken = undefined;
    partner.passwordResetExpires = undefined;

    await partner.save();

    return res.status(200).json({
      success: true,
      message: 'Password has been changed',
      status: 200,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Cannot reset password',
      status: 400,
    });
  }
};
