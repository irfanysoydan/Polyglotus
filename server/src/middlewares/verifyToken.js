const jwt = require("jsonwebtoken");
const db = require("../models");
const createError = require("http-errors");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) res.status(500).json("Bu işlem için erişim iznin yok");

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token doğrulanamadı."));
    req.user = user;
    next();
  });
};

const createAndGetAllCard = (req, res, next) => {
  verifyToken(req, res, async () => {
    if (req.body.deckId) {
      var deck = await db.Deck.findOne({
        where: { id: req.body.deckId },
      });
    } else {
      deck = await db.Deck.findOne({
        where: { id: req.params.deckId },
      });
    }
    if (deck && req.user.id === deck.userId) next();
    else return next(createError(403, "Bunu yapma iznine sahip değilsin"));
  });
};

const getAndDeleteCard = (req, res, next) => {
  verifyToken(req, res, async () => {
    const card = await db.Card.findOne({
      where: { id: req.params.id },
    });
    if (card) {
      var deck = await db.Deck.findOne({
        where: { id: card.deckId },
      });
    }

    if (deck && req.user.id === deck.userId) next();
    else return next(createError(403, "Böyle bir kart bulunamadı"));
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) next();
    else
      return next(
        createError(
          403,
          "Bu işlem yalnızca sistem admini tarafından yapılabilir."
        )
      );
  });
};

module.exports = {
  verifyToken,
  createAndGetAllCard,
  getAndDeleteCard,
  verifyAdmin,
};
