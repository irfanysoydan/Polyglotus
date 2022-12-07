const express = require("express");
const db = require("./models/index.js");
// const router = require("./routes")
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

db.sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("Database sync succesfully");
  })
  .catch((err) => {
    console.log("Error: Database not synced " + err);
  });

app.use(cors());
app.use(express.json());
//   app.use(router);
app.listen(PORT, () => {
  console.log(`Server is working on port ${PORT}`);
});
