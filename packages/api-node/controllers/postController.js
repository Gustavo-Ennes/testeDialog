const { Post } = require("../models/Post");
const {
    client: redisClient,
    addToRedis,
    getFromRedis,
} = require("../config/redis");
const { Profile } = require("../models/Profile");
const { getLogger } = require("../config/winston");

const postLogger = getLogger("PostController");

const REDIS_COLLECTION = "posts";

const getPosts = async (req, res) => {
    const { profileId } = req.params;

    try {
        if (!profileId || !Number.isInteger(parseInt(profileId, NaN))) {
            const error = "ProfileId param should be a number.";
            postLogger.error(error);
            return res.status(400).json({
                error,
            });
        }

        // search posts in redis first,
        const redisPosts = await getFromRedis(REDIS_COLLECTION, profileId);
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
        const error = `Error getting posts: ${err.message}`;
        postLogger.error(error, { params: req.params });
        return res.status(500).json({ error });
    }
};

const createPost = async (req, res) => {
    const { profileId, text } = req.body;

    try {
        if (!text) {
            const error = "A post needs a text.";
            postLogger.error(error);
            return res.status(400).send({ error });
        }

        const profile = await Profile.findOne({ where: { id: profileId } });
        if (profile == null) {
            const error = "A profile is needed to post something.";
            postLogger.error(error);
            return res.status(404).json({ error });
        }

        const newPost = await Post.create({
            text: text,
            likes: 0,
            profileId,
        });

        // add each new post to redis
        addToRedis(newPost, REDIS_COLLECTION, profileId);

        return res.status(201).json(newPost);
    } catch (err) {
        const error = `Error creating post: ${err.message} `;
        postLogger.error(error, { body: req.body });
        return res.status(500).json({ error });
    }
};

const likePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            const error = "Post not found";
            postLogger.error(error);
            return res.status(404).json({ error });
        }
        post.likes += 1;
        await post.save();
        return res.status(200).json({ likes: post.likes });
    } catch (err) {
        const error = `Error liking post: ${err.message}`;
        postLogger.error(error, { params: req.params });
        return res.status(500).json({ error });
    }
};

module.exports = {
    getPosts,
    createPost,
    likePost,
};
