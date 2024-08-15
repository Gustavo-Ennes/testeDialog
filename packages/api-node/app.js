const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerConfig = require("./swagger_output.json");

const { postRouter, authRouter, profileRouter } = require("./routes");
const { authenticationMiddleware } = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.use("/api/post", authenticationMiddleware, postRouter);
app.use("/api/profiles", authenticationMiddleware, profileRouter);
app.use("/api/auth/", authRouter);

module.exports = { app };
