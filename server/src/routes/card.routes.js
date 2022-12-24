const CardController = require("../controllers/card.controller");
const {
  createAndGetAllCard,
  getAndDeleteCard,
} = require("../middlewares/verifyToken");
const { check } = require("express-validator");
const { updateCardById } = require("../controllers/card.controller");
const CardRouter = require("express").Router();

CardRouter.post(
  "/",
  check(
    "word",
    "Kelimenizin uzunluğu en fazla 20 karakter içermelidir"
  ).isLength({ max: 20 }),
  check(
    "description",
    "Açıklamanız en fazla 100 karakter içermelidir."
  ).isLength({ max: 100 }),
  createAndGetAllCard,
  CardController.createCard
);
CardRouter.put("/", CardController.updateCardById);
CardRouter.get("/card/:id", getAndDeleteCard, CardController.getCardById);
CardRouter.get(
  "/:deckId",
  createAndGetAllCard,
  CardController.getAllCardsByDeckId
);
CardRouter.delete("/:id", getAndDeleteCard, CardController.deleteCardById);

module.exports = CardRouter;
