const GetUserDto = require("../dtos/user/GetUser.dto");
const db = require("../models");
const bcrypt = require("bcryptjs");
const HttpStatusCodes = require("http-status-codes");
const { ServiceResponse } = require("../common/serviceResponse");
const services = require("../services/index.services");

class UserController {
  getUserById = async (req, res, next) => {
    const id = req.params.id;
    try {
      if (req.user.id == id || req.user.isAdmin === true) {
        const user = await services.user.getById(id);
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
      const users = await services.user.getAll();
      res.status(HttpStatusCodes.OK).json(ServiceResponse.successWithData(users, HttpStatusCodes.OK));
    } catch (error) {
      next(error);
    }
  };

  updateUserRole = async (req, res, next) => {
    try {
      await services.user.updateUserRole(req.body.isAdmin, req.params.id);

      res.status(HttpStatusCodes.OK).json(ServiceResponse.success(null, HttpStatusCodes.OK));
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const response = await services.user.delete(req.params.id);

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
