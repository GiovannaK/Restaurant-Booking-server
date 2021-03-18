/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const sendEmail = require('../modules/mailer.js');

exports.register = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const {
      id, firstName, lastName, email, phone,
    } = newUser;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json(
        {
          success: false,
          message: 'User does not exist',
          status: 400,
        },
      );
    }

    const accountConfirmationToken = user.generateConfirmationToken();

    await user.save();

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
        to: user.email,
        subject: 'GetYourTable - Ative sua conta',
        text: message,
      });

      return res.status(200).json({
        success: true,
        message: 'Email sent',
        firstName,
        lastName,
        email,
        phone,
        id,
      });
    } catch (error) {
      user.emailConfirmationToken = undefined;
      user.emailConfirmationExpires = undefined;

      await user.save();
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

exports.registerPartner = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const {
      id, firstName, lastName, email, phone,
    } = newUser;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json(
        {
          success: false,
          message: 'User does not exist',
          status: 400,
        },
      );
    }

    const accountConfirmationToken = user.generateConfirmationToken();
    user.isPartner = true;

    await user.save();

    const confirmationUrl = `${process.env.BASE_URL}/session/account_confirmation/${accountConfirmationToken}`;

    const message = `
      <h1>Ative sua conta</h1>
      <h4>Você está recebendo este e-mail porque se registrou
        em nossa plataforma, clique no link abaixo para ativar sua conta
        e cadastrar seu resturante.
      </h4>
      <a href=${confirmationUrl} clicktracking=off>${confirmationUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: 'GetYourTable - Ative sua conta',
        text: message,
      });

      return res.status(200).json({
        success: true,
        message: 'Email sent',
        firstName,
        lastName,
        email,
        phone,
        id,
      });
    } catch (error) {
      user.emailConfirmationToken = undefined;
      user.emailConfirmationExpires = undefined;

      await user.save();
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

exports.registerAdmin = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const {
      id, firstName, lastName, email, phone,
    } = newUser;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json(
        {
          success: false,
          message: 'User does not exist',
          status: 400,
        },
      );
    }

    const accountConfirmationToken = user.generateConfirmationToken();
    user.isAdmin = true;

    await user.save();

    const confirmationUrl = `${process.env.BASE_URL}/session/account_confirmation/${accountConfirmationToken}`;

    const message = `
      <h1>Ative sua conta</h1>
      <h4>Você está recebendo este e-mail porque se registrou
        em nossa plataforma, clique no link abaixo para ativar sua conta
        e acessar a adminstração
      </h4>
      <a href=${confirmationUrl} clicktracking=off>${confirmationUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: 'GetYourTable - Ative sua conta',
        text: message,
      });

      return res.status(200).json({
        success: true,
        message: 'Email sent',
        firstName,
        lastName,
        email,
        phone,
        id,
      });
    } catch (error) {
      user.emailConfirmationToken = undefined;
      user.emailConfirmationExpires = undefined;

      await user.save();
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
    const user = await User.findOne({ emailConfirmationToken: req.params.confirmationToken }).select('+emailConfirmationToken emailConfirmationExpires');

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Token',
        status: 400,
      });
    }

    const now = Date.now();

    if (now > user.emailConfirmationExpires) {
      return res.status(400).json({
        success: false,
        message: 'Token expired',
        status: 400,
      });
    }

    user.isVerified = true;
    user.emailConfirmationExpires = undefined;
    user.emailConfirmationToken = undefined;

    await user.save();

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
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
        status: 400,
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'Account has already been verified',
        status: 400,
      });
    }

    const accountConfirmationToken = user.generateConfirmationToken();

    await user.save();

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
        to: user.email,
        subject: 'GetYourTable - Ative sua conta',
        text: message,
      });

      return res.status(200).json({
        success: true,
        message: 'Email sent',
        status: 200,
      });
    } catch (error) {
      user.emailConfirmationToken = undefined;
      user.emailConfirmationExpires = undefined;

      await user.save();
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

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User does not exist',
        status: 400,
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'Account not verified',
        status: 400,
      });
    }

    const isPasswordMatch = await user.passwordMatch(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email or password invalid',
        status: 401,
      });
    }

    const { id } = user;

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

exports.loginAdmin = async (email, password) => {
  try {
    const user = await User.findOne({ email, isAdmin: true }).select('+password');

    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        return user;
      }

      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'No user associated with this email was found',
        status: 400,
      });
    }

    const resetPasswordToken = user.generateResetToken();

    await user.save();

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
        to: user.email,
        subject: 'GetYourTable - Altere sua senha',
        text: message,
      });

      return res.status(200).json({
        success: true,
        message: 'Email sent',
        status: 200,
      });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;

      await user.save();
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

    const user = await User.findOne({ passwordResetToken: req.params.resetToken }).select('+passwordResetToken passwordResetExpires');

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Account does not exist',
        status: 400,
      });
    }

    const now = new Date();

    if (now > user.passwordResetExpires) {
      return res.status(400).json({
        success: false,
        message: 'Expired token',
        status: 400,
      });
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

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
