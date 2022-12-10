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
      Card.hasOne(models.Card, { foreignKey: "meaningId", onDelete: "cascade" });

      Card.belongsTo(models.Card, {
        foreignKey: { name: "meaningId", allowNull: true },
        onDelete: "cascade",
      });

      Card.belongsTo(models.Deck, {
        foreignKey: { name: "deckId", allowNull: false },
        onDelete: "cascade",
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
