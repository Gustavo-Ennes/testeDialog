const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { postRouter, authRouter, profileRouter } = require("./routes");
const { authenticationMiddleware } = require("./middleware/authMiddleware");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/api/posts", authenticationMiddleware, postRouter);
app.use("/api/profiles", authenticationMiddleware, profileRouter);
app.use("/api/auth/", authRouter);

module.exports = { app };
