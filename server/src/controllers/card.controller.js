const db = require("../models");
class CardController {
  createCard = async (req, res) => {
    try {
      const front = {
        word: req.body.front.word,
        description: req.body.front.description,
        status: req.body.front.status,
        deckId: req.body.front.deckId,
        meaningId: req.body.front.meaningId,
      };
      const back = {
        word: req.body.back.word,
        description: req.body.back.description,
        status: req.body.back.status,
        deckId: req.body.back.deckId,
        meaningId: req.body.back.meaningId,
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
      res.status(500).json(error);
    }
  };
}
module.exports = new CardController();
