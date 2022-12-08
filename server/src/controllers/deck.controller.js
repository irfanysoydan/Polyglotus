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
      res.status(500).json(error);
    }
  };
}
module.exports = new DeckController();
