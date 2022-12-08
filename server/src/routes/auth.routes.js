const AuthController = require("../controllers/auth.controller");
const AuthRouter = require("express").Router();

AuthRouter.post("/", UserController.createUser);

module.exports = AuthRouter;
