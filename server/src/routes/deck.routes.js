const DeckController = require("../controllers/deck.controller");
const DeckRouter = require("express").Router();

DeckRouter.post("/", DeckController.createDeck);
DeckRouter.get("/:id", DeckController.getDeckById);
DeckRouter.get("/", DeckController.getAllDecks);
DeckRouter.delete("/:id", DeckController.deleteDeck);

module.exports = DeckRouter;
