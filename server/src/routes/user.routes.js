const UserController = require("../controllers/user.controller");
const UserRouter = require("express").Router();
const { verifyAdmin } = require("../middlewares/verifyToken");
UserRouter.get("/", UserController.getAllUsers);
UserRouter.get("/:id", UserController.getUserById);
UserRouter.put("/:id", verifyAdmin, UserController.updateUser);
UserRouter.delete("/:id", verifyAdmin, UserController.deleteUser);

module.exports = UserRouter;
