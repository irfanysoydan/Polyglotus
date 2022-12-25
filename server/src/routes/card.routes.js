const CardController = require("../controllers/card.controller");
const { createAndGetAllCard, getUpdateAndDeleteCard } = require("../middlewares/verifyToken");
const { check } = require("express-validator");
const CardRouter = require("express").Router();

CardRouter.post(
  "/",
  check("word", "Kelimenizin uzunluğu en fazla 20 karakter içermelidir").isLength({ max: 20 }),
  check("description", "Açıklamanız en fazla 100 karakter içermelidir.").isLength({ max: 100 }),
  createAndGetAllCard,
  CardController.createCard
);
CardRouter.get("/card/:id", getUpdateAndDeleteCard, CardController.getCardById);
CardRouter.get("/:deckId", createAndGetAllCard, CardController.getAllCardsByDeckId);
CardRouter.delete("/:id", getUpdateAndDeleteCard, CardController.deleteCardById);
CardRouter.put("/:id/status", getUpdateAndDeleteCard, CardController.updateCardStatus);

module.exports = CardRouter;
