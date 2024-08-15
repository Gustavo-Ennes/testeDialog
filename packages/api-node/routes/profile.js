const { Router } = require("express");
const {
    getProfile,
    createProfile,
    updateProfile,
} = require("../controllers/profileController");

const router = Router();

router.get("/:id", getProfile);

router.post("/", createProfile);

router.put("/", updateProfile);

module.exports = { router };
