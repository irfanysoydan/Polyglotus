const AuthController = require("../controllers/auth.controller");
const AuthRouter = require("express").Router();

AuthRouter.post("/register", AuthController.createUser);
AuthRouter.post("/login", AuthController.loginUser);

module.exports = AuthRouter;
