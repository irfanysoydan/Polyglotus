"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Deck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Deck.belongsTo(models.User, {
        foreignKey: { name: "userId", allowNull: false },
        onDelete: "cascade",
      });
      Deck.hasMany(models.Card, {
        foreignKey: "deckId",
        onDelete: "cascade",
      });
    }
  }
  Deck.init(
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      status: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "Deck",
    }
  );
  return Deck;
};
