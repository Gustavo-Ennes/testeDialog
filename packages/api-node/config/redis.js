const redis = require("redis");

const redisHost = process.env.IS_CONTAINER ? process.env.REDIS_HOST : 'localhost'
const redisPort = process.env.REDIS_PORT;

const client = redis.createClient({
    url: `redis://${redisHost}:${redisPort}`,
});

if (process.env.NODE_ENV != "test") {
    client.connect().catch(console.error);

    client.on("error", (err) => console.error("Redis error:", err));

    const redisInfo = () => console.log("Redis is connected");

    client.on("connect", () => redisInfo());
}

const addPostToRedis = async (post, profileId) => {
    if (!post) return;

    const stringPostValue = await client.get(`posts:${profileId}`);
    console.log(`CREATE: post: ${JSON.stringify(stringPostValue, null, 2)}`);
    const posts = JSON.parse(stringPostValue);

    if (Array.isArray(posts)) {
        posts.push(post);
        console.log(`post pushed to posts: ${JSON.stringify(posts, null, 2)}`);
        client.set(`posts:${profileId}`, JSON.stringify(posts));
        console.log(`posts set;`);
    } else {
        const posts = [post];
        client.set(`posts:${profileId}`, JSON.stringify(posts));
        console.log(
            `no post exists. Setting now: ${JSON.stringify(posts, null, 2)}`
        );
    }
};

const getPostFromRedis = async (profileId) => {
    const stringPostValue = await client.get(`posts:${profileId}`);
    console.log(`GET: post: ${JSON.stringify(stringPostValue, null, 2)}`);
    const posts = JSON.parse(stringPostValue);
    return Array.isArray(posts) ? posts : null;
};

module.exports = { client, addPostToRedis, getPostFromRedis };
