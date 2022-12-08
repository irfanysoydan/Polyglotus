const express = require("express");
const AuthRouter = require("./auth.routes");
const UserRouter = require("./user.routes");
const DeckRouter = require("./deck.routes");
const CardRouter = require("./card.routes");
const Router = express();

Router.use("/auth", AuthRouter);
Router.use("/users", UserRouter);
Router.use("/decks", DeckRouter);
Router.use("/cards", CardRouter);

module.exports = Router;
