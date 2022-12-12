const CardController = require("../controllers/card.controller");
const { createAndGetAllCard, getAndDeleteCard } = require("../middlewares/verifyToken");
const CardRouter = require("express").Router();

CardRouter.post("/", createAndGetAllCard, CardController.createCard);
CardRouter.get("/card/:id", getAndDeleteCard, CardController.getCardById);
CardRouter.get("/:deckId", createAndGetAllCard, CardController.getAllCardsByDeckId);
CardRouter.delete("/:id", getAndDeleteCard, CardController.deleteCardById);

module.exports = CardRouter;
