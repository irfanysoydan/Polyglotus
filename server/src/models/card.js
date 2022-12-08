"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Card.belongsTo(models.Deck, {
        foreignKey: {
          name: "deckId",
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      });
      Card.hasOne(models.Card, {
        foreignKey: "meaningId",
      });
      Card.belongsTo(models.Card, {
        foreignKey: "meaningId",
      });
    }
  }
  Card.init(
    {
      word: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      status: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "Card",
    }
  );
  return Card;
};
