"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Deck extends Model {
    static associate(models) {
      Deck.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Deck.hasMany(models.Card, {
        foreignKey: "deckId",
      });
    }
  }

  Deck.init(
    {
      deckId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
    },
    { sequelize, modelName: "decks" }
  );

  return Deck;
};
