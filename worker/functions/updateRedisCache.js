const redisClient = require('../db/redisClient');
const cacheKey = process.env.REDIS_LATEST_CACHE_KEY;

module.exports = async (data) => {
    return await redisClient.setAsync(cacheKey, JSON.stringify(data));
};