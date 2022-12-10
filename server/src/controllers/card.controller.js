const { Op } = require("sequelize");
const db = require("../models");
class CardController {
  createCard = async (req, res, next) => {
    try {
      const front = {
        word: req.body.front.word,
        description: req.body.front.description,
        status: req.body.front.status,
        deckId: req.body.front.deckId,
      };
      const back = {
        word: req.body.back.word,
        description: req.body.back.description,
        status: req.body.back.status,
        deckId: req.body.back.deckId,
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

      res.status(201).json("Cards Created");
    } catch (error) {
      next(error);
    }
  };

  getCardById = async (req, res, next) => {
    try {
      const card = await db.Card.findAll({
        where: {
          [Op.or]: {
            id: {
              [Op.like]: req.params.id,
            },
            meaningId: {
              [Op.like]: req.params.id,
            },
          },
        },
      });
      console.log(card);
      res.status(200).json(card);
    } catch (error) {
      next(error);
    }
  };

  deleteCardById = async (req, res, next) => {
    try {
      await db.Card.destroy({ where: { id: req.params.id } });
      res.status(200).json("Card deleted");
    } catch (error) {
      next(error);
    }
  };
}
module.exports = new CardController();
