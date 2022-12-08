const db = require("../models");
class AuthController {
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

}
module.exports = new AuthController();
