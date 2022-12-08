const express = require("express");
const UserRouter = require("./user.routes");
const DeckRouter = require("./deck.routes");
const CardRouter = require("./card.routes");
const Router = express();

Router.use("/users", UserRouter);
Router.use("/decks", DeckRouter);
Router.use("/cards", CardRouter);

module.exports =  Router;
