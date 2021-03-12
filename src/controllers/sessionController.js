import User from '../models/User.js';
import sendEmail from '../modules/mailer.js';

export const register = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const {id, firstName, lastName, email, phone} = newUser;

    const user = await User.findOne({ email });

    if(!user){
      return res.status(400).json(
        {
          success: false,
          message: 'User does not exist',
          status: 400
        }
      )
    }

    const accountConfirmationToken = user.generateConfirmationToken();

    await user.save();

    const confirmationUrl = `http://${req.headers.host}/session/account_confirmation/${accountConfirmationToken}`

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
        subject: "GetYourTable - Ative sua conta",
        text: message,
      })

      return res.status(200).json({
        success: true,
        message: 'Email sent',
        firstName,
        lastName,
        email,
        phone,
        id
      })
    } catch (error) {
      console.log(error);
      user.emailConfirmationToken = undefined;
      user.emailConfirmationExpires = undefined;

      await user.save();
      return res.status(500).json({
        success: false,
        message: 'Email could be not sent',
        status: 500,
      })

    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'something went wrong, already have an account?',
      status: 400,
    })
  }
}

export const accountConfirmation = async (req, res) => {

  try {
    const user = await User.findOne({emailConfirmationToken: req.params.confirmationToken}).select('+emailConfirmationToken emailConfirmationExpires')

    if(!user){
      return res.status(400).json({
        success: false,
        message: 'Invalid Token',
        status: 400,
      })
    }

    const now = Date.now();

    if(now > user.emailConfirmationExpires){
      return res.status(400).json({
        success: false,
        message: 'Token expired',
        status: 400,
      })
    }

    user.isVerified = true
    user.emailConfirmationExpires = undefined
    user.emailConfirmationToken = undefined

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Account activated',
      status: 200,
    })

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Cannot verify account',
      status: 400,
    })
  }
}
