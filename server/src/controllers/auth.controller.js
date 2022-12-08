const db = require("../models");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

class AuthController {
  createUser = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    try {
      const info = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: hash,
      };

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

      const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT);
      res.cookie("Token", token).status(200).json("Giriş Yapıldı.");
    } catch (err) {
      next(err);
    }
  };
}
module.exports = new AuthController();
