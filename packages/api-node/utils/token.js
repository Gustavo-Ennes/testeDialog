const { sign } = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/auth");

const getNewToken = ({ email, profile, expired = false }) =>
    sign({ email, profile: JSON.stringify(profile) }, JWT_SECRET, {
        expiresIn: expired ? -1 : "10h",
    });

module.exports = { getNewToken };
