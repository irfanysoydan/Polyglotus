const db = require("../models");

module.exports = {
  create: async (deckData) => {
    const deck = await db.Deck.create(deckData);
    return deck;
  },
  getById: async (id, userId) => {
    const deck = await db.Deck.findOne({
      where: {
        id: id,
        userId: userId,
      },
      include: {
        model: db.Card,
      },
    });
    return deck;
  },
  getAll: async (userId) => {
    const decks = await db.Deck.findAll({
      where: { userId: userId },
    });
    return decks;
  },
  delete: async (id, userId) => {
    const response = await db.Deck.destroy({
      where: { id: id, userId: userId },
    });
    return response;
  },
  updateStatus: async (id, status) => {
    await db.Deck.update(
      {
        status: status,
      },
      { where: { id: id } }
    );
  },
};
