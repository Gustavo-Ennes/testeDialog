const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");
const postRoutes = require("./routes/posts");
const profileRoutes = require("./routes/profile");
const authRoutes = require("./routes/auth");
const { authenticationMiddleware } = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// TODO colocar middleware
app.use("/api/posts", authenticationMiddleware, postRoutes);
app.use("/api/profiles", authenticationMiddleware, profileRoutes);
app.use("/api/auth/", authRoutes);

const PORT = process.env.PORT || 5000;

sequelize
    .sync()
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error("Failed to sync database:", err);
    });
