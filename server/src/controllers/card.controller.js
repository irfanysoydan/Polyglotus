const db = require("../models");
class CardController {
  createCard = async (req, res, next) => {
    try {
      const front = {
        word: req.body.front.word,
        description: req.body.front.description,
        status: req.body.front.status,
        deckId: req.body.deckId,
      };
      const back = {
        word: req.body.back.word,
        description: req.body.back.description,
        status: req.body.back.status,
        deckId: req.body.deckId,
      };

      const cardFront = await db.Card.create(front);
      const cardBack = await db.Card.create(back);

      await db.Card.update(
        { meaningId: cardBack.id },
        {
          where: { id: cardFront.id },
        }
      );
      await db.Card.update(
        { meaningId: cardFront.id },
        {
          where: { id: cardBack.id },
        }
      );

      res.status(201).json("Kart Oluşturuldu");
    } catch (error) {
      next(error);
    }
  };

  getCardById = async (req, res, next) => {
    try {
      const card = await db.Card.findOne({
        where: {
          id: req.params.id,
        },
        include: [{ as: "Meaning", model: db.Card }],
      });
      console.log(card);
      res.status(200).json(card);
    } catch (error) {
      next(error);
    }
  };

  getAllCardsByDeckId = async (req, res, next) => {
    try {
      const cards = await db.Card.findAll({
        where: {
          deckId: req.params.deckId,
        },
      });
      res.status(200).json(cards);
    } catch (error) {
      next(error);
    }
  };

  deleteCardById = async (req, res, next) => {
    try {
      await db.Card.destroy({ where: { id: req.params.id } });
      res.status(200).json("Kart destedenn silindi.");
    } catch (error) {
      next(error);
    }
  };
}
module.exports = new CardController();
