const { router: postRouter } = require("./post");
const { router: profileRouter } = require("./profile");
const { router: authRouter } = require("./auth");

module.exports = {
  postRouter,
  profileRouter,
  authRouter,
};
