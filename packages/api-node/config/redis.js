const redis = require("redis");

const redisHost = process.env.IS_CONTAINER
    ? process.env.REDIS_HOST
    : "localhost";
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

const addToRedis = async (item, collection, identifier) => {
    if (!item) return;

    const stringValue = await client.get(`${collection}:${identifier}`);
    console.log(
        `CREATE: ${identifier}: ${JSON.stringify(stringValue, null, 2)}`
    );
    let items = JSON.parse(stringValue);

    if (Array.isArray(items)) items.push(item);
    else {
        items = [item];
    }
    client.set(`${collection}:${identifier}`, JSON.stringify(items));
};

const getFromRedis = async (collection, identifier) => {
    const stringValue = await client.get(`${collection}:${identifier}`);
    const items = JSON.parse(stringValue);
    return Array.isArray(items) ? items : null;
};

module.exports = {
    client,
    addToRedis,
    getFromRedis,
};
