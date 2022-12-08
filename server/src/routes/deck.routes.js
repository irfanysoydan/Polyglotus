const DeckController = require("../controllers/deck.controller");
const DeckRouter = require("express").Router();

DeckRouter.post("/", DeckController.createDeck);

module.exports = DeckRouter;
