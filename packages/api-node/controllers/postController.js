const { Post } = require("../models/Post");
const {
  client: redisClient,
  addPostToRedis,
  getPostFromRedis,
} = require("../config/redis");
const { Profile } = require("../models/Profile");

const getPosts = async (req, res) => {
  try {
    const { profileId } = req.params;

    if (!profileId || !Number.isInteger(parseInt(profileId, NaN)))
      return res.status(400).json({
        error: "ProfileId param should be a number.",
      });

    // search posts in redis first,
    const redisPosts = await getPostFromRedis(profileId);
    if (redisPosts) return res.json(redisPosts);

    // if nothing in redis, then search in db
    const posts = await Post.findAll({
      order: [["createdAt", "DESC"]],
      where: { profileId },
    });
    // // and update redis
    redisClient.set(`posts:${profileId}`, JSON.stringify(posts));

    return res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    return res.status(500).json({ message: "Server Error: " + err });
  }
};

const createPost = async (req, res) => {
  try {
    const { profileId } = req.body;

    const profile = await Profile.findOne({ where: { id: profileId } });
    if (profile == null)
      return res
        .status(404)
        .json({ error: "A profile is needed to post something." });

    const newPost = await Post.create({
      text: req.body.text,
      likes: 0,
      profileId,
    });

    // add each new post to redis
    addPostToRedis(newPost, profileId);

    return res.json(newPost);
  } catch (err) {
    console.error("Error creating post:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.likes += 1;
    await post.save();
    return res.json({ likes: post.likes });
  } catch (err) {
    console.error("Error liking post:", err.response.data.error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getPosts,
  createPost,
  likePost,
};
