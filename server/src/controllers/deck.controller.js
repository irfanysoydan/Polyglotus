const db = require("../models");
class DeckController {
  createDeck = async (req, res, next) => {
    try {
      const data = {
        name: req.body.name,
        status: req.body.status,
        userId: req.body.userId,
      };

      const deck = await db.Deck.create(data);
      res.status(201).json(deck);
    } catch (error) {
      next(error);
    }
  };

  getDeckByName = async (req, res, next) => {
    try {
      const deck = await db.Deck.findOne({
        where: {
          name: req.params.name,
        },
        include: {
          model: db.Card,
        },
      });
      console.log(deck);
      res.status(200).json(deck);
    } catch (error) {
      next(error);
    }
  };

  getAllDecks = async (req, res, next) => {
    try {
      const decks = await db.Deck.findAll({
        include: {
          model: db.Card,
        },
      });
      console.log(decks);
      res.status(200).json(decks);
    } catch (error) {
      next(error);
    }
  };

  deleteDeck = async (req, res, next) => {
    try {
      await db.Deck.destroy({ where: { name: req.params.name } });
      res.status(200).json("Name deleted");
    } catch (error) {
      next(error);
    }
  };
}
module.exports = new DeckController();
