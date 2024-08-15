const { verify } = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/auth");

const authenticationMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  
  if (!token)
    return res.status(401).json({ error: "'authorization' header needed." });

  verify(token, JWT_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ error: "Invalid or expired token: " + err.message });
    req.user = user;
    next();
  });
};

module.exports = { authenticationMiddleware };
