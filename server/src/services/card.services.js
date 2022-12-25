const db = require("../models");

module.exports = {
  create: async (cardData) => {
    const card = await db.Card.create(cardData);
    return card;
  },
  updateMeaning: async (id, meaningId) => {
    await db.Card.update(
      { meaningId: meaningId },
      {
        where: { id: id },
      }
    );
  },
  getById: async (id) => {
    const card = await db.Card.findOne({
      where: {
        id: id,
      },
    });
    return card;
  },
  getAllByDeckId: async (deckId) => {
    const { count, rows } = await db.Card.findAndCountAll({
      where: {
        deckId: deckId,
      },
    });
    return { count, rows };
  },
  delete: async (id) => {
    const response = await db.Card.destroy({ where: { id: id } });
    return response;
  },
  updateStatus: async (id, status) => {
    const response = await db.Card.update({ status: status }, { where: { id: id } });
    return response;
  },
};
