const db = require("../models");
class UserController {
  createUser = async (req, res) => {
    try {
      const info = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
      };

      const user = await db.User.create(info);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  getUserById = async (req, res) => {
    const id = req.params.id;

    try {
      const user = await db.User.findOne({
        where: { id: id },
      });
      console.log(user);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  getAllUsers = async (req, res) => {
    try {
      const users = await db.User.findAll({
        include: {
          model: db.Deck
        },
      });
      console.log(users);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  };
}
module.exports = new UserController();
