const AuthController = require("../controllers/auth.controller");
const AuthRouter = require("express").Router();

AuthRouter.post("/register", AuthController.createUser);
AuthRouter.post("/login", AuthController.loginUser);
AuthRouter.post("/forgotPassword", AuthController.forgotPassword);
AuthRouter.get("/resetPassword", AuthController.resetPassword);

module.exports = AuthRouter;
