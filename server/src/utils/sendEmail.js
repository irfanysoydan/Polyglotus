const nodemailer = require("nodemailer");

const sendResetPasswordMail = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "For Reset Password",
      html:
        "<p> Merhaba " +
        name +
        ', Lütfen linki kopyalayınız <a href="http://localhost:4200/resetPassword?token=' +
        token +
        '"> şifreyi değiştiriniz.</a>',
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail gönderildi- ", info.response);
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendResetPasswordMail };
