jest.mock('../db/redisClient', () => {
    const data = {};
    const client = {
        setAsync: (key, value) => {
            data[key] = value;
            return new Promise((resolve) => resolve());
        },
        getAsync: (key) => new Promise((resolve) => resolve(data[key])),
        _getAll: () => data
    };
    return client;
});
const redisClient = require('../db/redisClient');

const updateRedisCache = require('./updateRedisCache');
const cacheKey = process.env.REDIS_LATEST_CACHE_KEY;

test('should save to cache', async () => {
    const data = [{ test: 'test' }];
    updateRedisCache(data);
    const savedData = await redisClient.getAsync(cacheKey);
    expect(JSON.parse(savedData)).toEqual(data);
});

test('should only update one cache key', async () => {
    updateRedisCache([{ test: 'test' }]);
    updateRedisCache([{ test2: 'test2' }]);
    const allData = redisClient._getAll();
    expect(Object.keys(allData).length).toEqual(1);
});
