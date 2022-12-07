"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    static associate(models) {
      Card.belongsTo(models.Deck, {
        foreignKey: "deckId",
      });
      Card.hasOne(models.Card, {
        foreignKey: "meaningId",
      });
      Card.belongsTo(models.Card, {
        foreignKey: "cardId",
      });
    }
  }

  Card.init(
    {
      cardId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      deckId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      word: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      meaningId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { sequelize, modelName: "cards" }
  );

  return Card;
};
