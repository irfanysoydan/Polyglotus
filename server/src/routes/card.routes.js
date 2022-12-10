const CardController = require("../controllers/card.controller");
const CardRouter = require("express").Router();

CardRouter.post("/", CardController.createCard);
CardRouter.get("/:id", CardController.getCardById);
CardRouter.delete("/:id", CardController.deleteCardById);

module.exports = CardRouter;
