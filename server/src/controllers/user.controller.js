const GetUserDto = require("../dtos/user/GetUser.dto");
const db = require("../models");
class UserController {
  getUserById = async (req, res, next) => {
    const id = req.params.id;

    try {
      const user = await db.User.findOne({
        where: { id: id },
        include: {
          model: db.Deck,
        },
      });
      res.status(200).json(new GetUserDto(user));
    } catch (error) {
      res.status(500).json(error);
    }
  };

  getAllUsers = async (req, res, next) => {
    try {
      const users = await db.User.findAll({
        include: {
          model: db.Deck,
        },
      });
      console.log(users);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      await db.User.update({ fullName: req.body.fullName, email: req.body.email, password: req.body.password }, { where: { id: req.params.id } });
      res.status(200).json("User updated");
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      await db.User.destroy({ where: { id: req.params.id } });
      res.status(200).json("User deleted");
    } catch (error) {
      next(error);
    }
  };
}
module.exports = new UserController();
