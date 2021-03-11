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
        }
      )
    }

    const confirmationToken = user.generateConfirmationToken();

    await user.save();

    const confirmationUrl = `http://${req.headers.host}/session/account_confirmation/${confirmationToken}`

    const message = `
      <h1>Ative sua conta</h1>
      <p>Você está recebendo este e-mail porque se registrou
        em nossa plataforma, clique no link abaixo para ativar sua conta.
      </p>
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
        newUser,
      })
    } catch (error) {
      user.emailConfirmationToken = undefined;
      user.emailConfirmationExpires = undefined;

      await user.save();
      return res.status(500).json({
        success: false,
        message: 'Email could be not sent',
      })

    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'something went wrong, already have an account?',
    })
  }
}
