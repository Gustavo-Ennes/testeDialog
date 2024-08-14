const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/auth");

exports.authenticationMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    console.log("req headers: ", JSON.stringify(req.headers, null, 2));
    if (!token)
        return res
            .status(401)
            .json({ error: "'authorization' header needed." });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err)
            return res
                .status(403)
                .json({ error: "Invalid or expired token: " + err.message });
        req.user = user;
        next();
    });
};
