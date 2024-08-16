const { Router } = require("express");
const {
    getPosts,
    createPost,
    likePost,
} = require("../controllers/postController");

const router = Router();

router.get("/:profileId", getPosts);

router.post("/", createPost);

router.get("/:id/like", likePost);

module.exports = { router };
