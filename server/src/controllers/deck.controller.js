const db = require("../models");
class DeckController {
  createDeck = async (req, res) => {
    try {
      const data = {
        name: req.body.name,
        status: req.body.status,
        creatorId: req.body.creatorId,
      };

      const deck = await db.Deck.create(data);
      res.status(201).json(deck);
    } catch (error) {
      res.status(500).json(error);
    }
  };

}
module.exports = new DeckController();
