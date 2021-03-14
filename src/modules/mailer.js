const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');

exports.sendEmail = (options) => {
  const transporter = nodemailer.createTransport(nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY
  }));

  const mailOptions = {
    from: process.env.EMAIL_HOST_USER,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err){
      console.log(err)
    }
    console.log(info)
  });
};



