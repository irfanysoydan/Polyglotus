const CardController = require("../controllers/card.controller");
const CardRouter = require("express").Router();

CardRouter.post("/", CardController.createCard);

module.exports = CardRouter;
