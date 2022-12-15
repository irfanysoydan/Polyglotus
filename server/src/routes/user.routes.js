const UserController = require("../controllers/user.controller");
const { verifyAdmin, verifyToken } = require("../middlewares/verifyToken");
const UserRouter = require("express").Router();
UserRouter.get("/", verifyAdmin, UserController.getAllUsers);
UserRouter.get("/:id", verifyToken, UserController.getUserById);
UserRouter.put("/:id", verifyAdmin, UserController.updateUser);
UserRouter.delete("/:id", verifyAdmin, UserController.deleteUser);

module.exports = UserRouter;
