const db = require("../models");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const HttpStatusCodes = require("http-status-codes");
const { ServiceResponse } = require("../common/serviceResponse");

const randomstring = require("randomstring");

const CreateUserDto = require("../dtos/user/CreateUser.dto");
const { sendResetPasswordMail } = require("../utils/sendEmail");

class AuthController {
  createUser = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors);
    }
    try {
      req.body.password = hash;
      const info = new CreateUserDto(req.body);

      const user = await db.User.create(info);
      res
        .status(HttpStatusCodes.CREATED)
        .json(ServiceResponse.successWithData(user, HttpStatusCodes.CREATED));
    } catch (error) {
      next(error);
    }
  };

  loginUser = async (req, res, next) => {
    try {
      const user = await db.User.findOne({ where: { email: req.body.email } });
      if (!user) return next(createError(404, "Mail adresiniz yanlış"));
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect)
        return res
          .status(HttpStatusCodes.OK)
          .json(
            ServiceResponse.fail(
              HttpStatusCodes.NOT_FOUND,
              "/auth/login",
              "Şifreyi yanlış girdiniz."
            )
          );

      const token = jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        process.env.JWT,
        { expiresIn: "1w" }
      );
      const responseValue = {
        token: token,
        id: user.id,
        isAdmin: user.isAdmin,
      };
      res.status(200).send(responseValue);
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
        await db.User.update(
          { token: randomString },
          { where: { email: email } }
        );
        sendResetPasswordMail(userData.fullName, userData.email, randomString);
        res
          .status(HttpStatusCodes.OK)
          .json(ServiceResponse.success(null, HttpStatusCodes.OK));
      } else {
        return res
          .status(HttpStatusCodes.OK)
          .json(
            ServiceResponse.fail(
              HttpStatusCodes.NOT_FOUND,
              "/auth/forgotPassword",
              "Böyle bir email mevcut değil."
            )
          );
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
        await db.User.update(
          { password: password },
          { where: { id: tokenData.id } }
        );
        res
          .status(HttpStatusCodes.OK)
          .json(ServiceResponse.success(null, HttpStatusCodes.OK));
      } else {
        return res
          .status(HttpStatusCodes.OK)
          .json(
            ServiceResponse.fail(
              HttpStatusCodes.NOT_FOUND,
              "/auth/resetPassword",
              "Linkin süresi tükendi."
            )
          );
      }
    } catch (error) {
      next(error);
    }
  };
}
module.exports = new AuthController();
