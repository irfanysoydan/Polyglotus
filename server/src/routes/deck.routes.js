const DeckController = require("../controllers/deck.controller");
const DeckRouter = require("express").Router();
const { check } = require("express-validator");

DeckRouter.post(
  "/",
  check("name", "Destenizin adı en fazla 20 karakter içermeli").isLength({ max: 20 }),
  DeckController.createDeck
);
DeckRouter.get("/:id", DeckController.getDeckById);
DeckRouter.get("/", DeckController.getAllDecks);
DeckRouter.delete("/:id", DeckController.deleteDeck);
DeckRouter.get("/:id/status", DeckController.getDeckStatsById);

module.exports = DeckRouter;
