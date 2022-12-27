const db = require("../models");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const HttpStatusCodes = require("http-status-codes");
const { ServiceResponse } = require("../common/serviceResponse");
const services = require("../services/index.services");

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
      const userData = new CreateUserDto(req.body);

      const user = await services.user.create(userData);
      res.status(HttpStatusCodes.CREATED).json(ServiceResponse.successWithData(user, HttpStatusCodes.CREATED));
    } catch (error) {
      next(error);
    }
  };

  loginUser = async (req, res, next) => {
    const email = req.body.email;
    try {
      const user = await services.user.getByEmail(email);
      if (!user) return next(createError(404, "Mail adresiniz yanlış"));
      const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordCorrect)
        return res
          .status(HttpStatusCodes.OK)
          .json(ServiceResponse.fail(HttpStatusCodes.NOT_FOUND, "/auth/login", "Şifreyi yanlış girdiniz."));

      const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT, { expiresIn: "1w" });
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
    const email = req.body.email;
    try {
      const userData = await services.user.getByEmail(email);

      if (userData) {
        const randomString = randomstring.generate();
        await services.user.updateTokenByEmail(randomString, email);
        sendResetPasswordMail(userData.fullName, userData.email, randomString);
        res.status(HttpStatusCodes.OK).json(ServiceResponse.success(null, HttpStatusCodes.OK));
      } else {
        return res
          .status(HttpStatusCodes.OK)
          .json(ServiceResponse.fail(HttpStatusCodes.NOT_FOUND, "/auth/forgotPassword", "Böyle bir email mevcut değil."));
      }
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req, res, next) => {
    try {
      const token = req.query.token;

      const tokenData = await services.user.getByToken(token);

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      if (tokenData) {
        const password = hash;
        await services.user.updatePasswordById(password, tokenData.id);
        await services.user.deleteTokenData(tokenData.id);
        res.status(HttpStatusCodes.OK).json(ServiceResponse.success(null, HttpStatusCodes.OK));
      } else {
        return res
          .status(HttpStatusCodes.OK)
          .json(ServiceResponse.fail(HttpStatusCodes.NOT_FOUND, "/auth/resetPassword", "Linkin süresi tükendi."));
      }
    } catch (error) {
      next(error);
    }
  };
}
module.exports = new AuthController();
