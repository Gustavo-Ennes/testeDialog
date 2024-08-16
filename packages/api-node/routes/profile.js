const { Router } = require("express");
const {
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile,
} = require("../controllers/profileController");

const router = Router();

router.get("/:id", getProfile);

router.delete("/:id", deleteProfile);

router.post("/", createProfile);

router.put("/", updateProfile);

module.exports = { router };
