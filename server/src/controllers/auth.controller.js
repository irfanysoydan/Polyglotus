const db = require("../models");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

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
        ', Lütfen linki kopyalayınız <a href="http://localhost:3000/auth/resetPassword?token=' +
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

const CreateUserDto = require("../dtos/user/CreateUser.dto");

class AuthController {
  createUser = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    try {
      req.body.password = hash;
      const info = new CreateUserDto(req.body);

      const user = await db.User.create(info);
      res.status(201).json(user.fullName + " isimli kullanıcı oluşturuldu.");
    } catch (err) {
      next(err);
    }
  };

  loginUser = async (req, res, next) => {
    try {
      const user = await db.User.findOne({ where: { email: req.body.email } });
      if (!user) return next(createError(404, "Mail adresiniz yanlış"));
      const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordCorrect) return next(createError(404, "Şifreyi yanlış girdiniz"));

      const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT, { expiresIn: "1w" });
      res.status(200).json(token);
    } catch (err) {
      next(err);
    }
  };

  forgotPassword = async (req, res, next) => {
    try {
      const email = req.body.email;
      const userData = await db.User.findOne({ where: { email: email } });
      if (userData) {
        const randomString = randomstring.generate();
        await db.User.update({ token: randomString }, { where: { email: email } });
        sendResetPasswordMail(userData.fullName, userData.email, randomString);
        res.status(200).json("Lütfen mail kutunuzu kontrol ediniz.");
      } else {
        return next(createError(404, "Böyle bir e-mail mevcut değil"));
      }
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req, res, next) => {
    try {
      const token = req.query.token;

      const tokenData = await db.User.findOne({ where: { token: token } });
      console.log(tokenData);

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      if (tokenData) {
        const password = hash;
        await db.User.update({ password: password }, { where: { id: tokenData.id } });
        res.status(200).json("Şifreniz Değiştirildi");
      } else {
        return next(createError(200, "Linkin süresi tükendi"));
      }
    } catch (error) {
      next(error);
    }
  };
}
module.exports = new AuthController();
