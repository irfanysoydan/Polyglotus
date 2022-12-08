const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies["access-token"];

  if (!token) res.status(500).json("Bu işlem için erişim iznin yok");

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) res.status(500).json("Token doğrulanamadı.");
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) next();
    else res.status(500).json("Bunu yapma iznine sahip değilsin");
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) next();
    else res.status(500).json("Bunu yapma iznine sahip değilsin");
  });
};

module.exports = { verifyToken, verifyUser, verifyAdmin };
