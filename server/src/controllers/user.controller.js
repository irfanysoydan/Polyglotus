const GetUserDto = require("../dtos/user/GetUser.dto");
const db = require("../models");
const bcrypt = require("bcryptjs");
const HttpStatusCodes = require("http-status-codes");
const { ServiceResponse } = require("../common/serviceResponse");

class UserController {
  getUserById = async (req, res, next) => {
    const id = req.params.id;
    try {
      if (req.user.id == id || req.user.isAdmin === true) {
        const user = await db.User.findOne({
          where: { id: id },
          include: {
            model: db.Deck,
          },
        });
        res.status(HttpStatusCodes.OK).json(ServiceResponse.successWithData(new GetUserDto(user), HttpStatusCodes.OK));
      } else {
        return res
          .status(HttpStatusCodes.NOT_FOUND)
          .json(ServiceResponse.fail(HttpStatusCodes.NOT_FOUND, "/users/", "Böyle bir kullanıcı bulunamadı."));
      }
    } catch (error) {
      next(error);
    }
  };

  getAllUsers = async (req, res, next) => {
    try {
      const users = await db.User.findAll({
        include: {
          model: db.Deck,
        },
      });
      res.status(HttpStatusCodes.OK).json(ServiceResponse.successWithData(users, HttpStatusCodes.OK));
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      if (req.body.password) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        await db.User.update(
          {
            fullName: req.body.fullName,
            email: req.body.email,
            password: hash,
            isAdmin: req.body.isAdmin,
          },
          { where: { id: req.params.id } }
        );
      } else {
        await db.User.update(
          {
            fullName: req.body.fullName,
            email: req.body.email,
            isAdmin: req.body.isAdmin,
          },
          { where: { id: req.params.id } }
        );
      }

      res.status(HttpStatusCodes.OK).json(ServiceResponse.success(null, HttpStatusCodes.OK));
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const response = await db.User.destroy({ where: { id: req.params.id } });

      if (!response)
        return res
          .status(HttpStatusCodes.OK)
          .json(ServiceResponse.fail(HttpStatusCodes.NOT_FOUND, "/users/", "Böyle bir kullanıcı bulunamadı."));
      res.status(HttpStatusCodes.OK).json(ServiceResponse.success(null, HttpStatusCodes.OK));
    } catch (error) {
      next(error);
    }
  };
}
module.exports = new UserController();
