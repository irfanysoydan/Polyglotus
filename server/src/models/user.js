"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Deck, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      fullName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      isAdmin: { type: DataTypes.BOOLEAN, defaultValue: 0 },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
