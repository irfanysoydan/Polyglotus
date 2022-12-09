const DeckController = require("../controllers/deck.controller");
const DeckRouter = require("express").Router();

DeckRouter.post("/", DeckController.createDeck);
DeckRouter.get("/:name", DeckController.getDeckByName);
DeckRouter.get("/", DeckController.getAllDecks);
DeckRouter.delete("/:name", DeckController.deleteDeck);

module.exports = DeckRouter;
