const { Router } = require("express");
const { signup, login, tokenCheck } = require("../controllers/authController");

const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/token-check", tokenCheck);

module.exports = { router };
