const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerConfig = require("./swagger_output.json");
const { connectWebSocket } = require("./config/webSocket");

const { postRouter, authRouter, profileRouter } = require("./routes");
const { authenticationMiddleware } = require("./middleware/authMiddleware");

const app = express();
connectWebSocket();

app.use(cors());
app.use(bodyParser.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.use("/api/posts", authenticationMiddleware, postRouter);
app.use("/api/profiles", authenticationMiddleware, profileRouter);
app.use("/api/auth/", authRouter);

module.exports = { app };
