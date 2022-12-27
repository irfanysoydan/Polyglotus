const db = require("../models");

module.exports = {
  create: async (userData) => {
    const user = await db.User.create(userData);
    return user;
  },

  getByEmail: async (email) => {
    const user = await db.User.findOne({
      where: {
        email: email,
      },
    });

    return user;
  },

  updateTokenByEmail: async (randomString, email) => {
    await db.User.update({ token: randomString }, { where: { email: email } });
  },

  getByToken: async (token) => {
    const user = await db.User.findOne({
      where: {
        token: token,
      },
    });
    return user;
  },
  updatePasswordById: async (password, id) => {
    await db.User.update({ password: password }, { where: { id: id } });
  },
  deleteTokenData: async (id) => {
    await db.User.update({ token: null }, { where: { id: id } });
  },

  getById: async (id) => {
    const user = await db.User.findOne({
      where: { id: id },
      include: {
        model: db.Deck,
      },
    });
    return user;
  },
  getAll: async () => {
    const users = await db.User.findAll({
      include: {
        model: db.Deck,
      },
    });
    return users;
  },
  updateUserRole: async (isAdmin, id) => {
    await db.User.update(
      { isAdmin: isAdmin },
      {
        where: {
          id: id,
        },
      }
    );
  },
  delete: async (id) => {
    const response = await db.User.destroy({ where: { id: id } });
    return response;
  },
};
