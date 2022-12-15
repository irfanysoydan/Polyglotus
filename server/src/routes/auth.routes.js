const AuthController = require("../controllers/auth.controller");
const AuthRouter = require("express").Router();
const { check } = require("express-validator");

AuthRouter.post(
  "/register",
  check("email", "Lütfen geçerli bir email adresi giriniz").isEmail(),
  check("password", "Şifreniz en az 8, en fazla 24 karakter içermeli").isLength({ min: 8, max: 24 }),
  check("fullName", "Adınız en az 3, en fazla 40 karakter içermeli").isLength({ min: 3, max: 40 }),
  AuthController.createUser
);
AuthRouter.post(
  "/login",
  check("email", "Lütfen geçerli bir email adresi giriniz").isEmail(),
  check("password", "Şifreniz en az 8, en fazla 24 karakter içermeli").isLength({ min: 8, max: 24 }),
  AuthController.loginUser
);
AuthRouter.post("/forgotPassword", AuthController.forgotPassword);
AuthRouter.get("/resetPassword", AuthController.resetPassword);

module.exports = AuthRouter;
