const express = require("express");
const db = require("./models/index.js");
const router = require("../src/routes");
const dotenv = require("dotenv");
const cors = require("cors");
const { ErrorHandler } = require("./middlewares/errorHandler.js");

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(ErrorHandler);

const PORT = process.env.PORT || 3000;

db.sequelize
  .sync({ alter: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is working on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
