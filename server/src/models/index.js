const dbConfig = require("../config/databaseConfig.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync({ force: false });

db.users = require("./user.js")(sequelize, Sequelize.DataTypes);
db.decks = require("./deck.js")(sequelize, Sequelize.DataTypes);
db.cards = require("./card.js")(sequelize, Sequelize.DataTypes);

module.exports = db;
