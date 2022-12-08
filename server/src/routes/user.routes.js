const UserController = require("../controllers/user.controller");
const UserRouter = require("express").Router();

UserRouter.get("/", UserController.getAllUsers);
UserRouter.get("/:id", UserController.getUserById);

module.exports = UserRouter;
