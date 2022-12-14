const createError = require("http-errors");
const CreateDeckDto = require("../dtos/deck/CreateDeck.dto");
const GetDeckDto = require("../dtos/deck/GetDeck.dto");
const db = require("../models");
class DeckController {
  createDeck = async (req, res, next) => {
    try {
      const data = new CreateDeckDto(req.body);
      data.userId = req.user.id;

      const deck = await db.Deck.create(data);
      res.status(201).json(deck);
    } catch (error) {
      next(error);
    }
  };

  getDeckById = async (req, res, next) => {
    try {
      const deck = await db.Deck.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id,
        },
        include: {
          model: db.Card,
          include: {
            as: "Meaning",
            model: db.Card,
          },
        },
      });
      if (!deck) return next(createError(404, "Bu isimde bir deste bulunamadı."));
      res.status(200).json(new GetDeckDto(deck));
    } catch (error) {
      next(error);
    }
  };

  getAllDecks = async (req, res, next) => {
    try {
      const decks = await db.Deck.findAll({
        where: { userId: req.user.id },
      });
      if (decks.length === 0) return next(createError(404, "Sisteme kayıtlı deste bulunamadı."));
      res.status(200).json(decks);
    } catch (error) {
      next(error);
    }
  };

  deleteDeck = async (req, res, next) => {
    try {
      const state = await db.Deck.destroy({ where: { id: req.params.id, userId: req.user.id } });
      if (!state) return next(createError(404, "Bu isimde bir deste bulunamadı."));

      res.status(200).json("Deste Silindi");
    } catch (error) {
      next(error);
    }
  };
}
module.exports = new DeckController();
