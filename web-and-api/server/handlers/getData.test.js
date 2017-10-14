jest.mock('../db/redisClient', () => {
    let data = {};
    const client = {
        setAsync: (key, value) => {
            data[key] = value;
            return new Promise((resolve) => resolve());
        },
        getAsync: (key) => new Promise((resolve) => resolve(data[key])),
        _getAll: () => data,
        _clean: () => data = {}
    };
    return client;
});

const mongoose = require('mongoose');
mongoose.Promise = Promise;
const { Mockgoose } = require('mockgoose');
const mockgoose = new Mockgoose(mongoose);
const uuid = require('uuid/v1');
const Price = require('../db/Price');
const redisClient = require('../db/redisClient');
const cacheKey = process.env.REDIS_LATEST_CACHE_KEY;

const getData = require('./getData');

const sampleData = [
    { pair: '1-1', base: '1', target: '1', price: 0.299, volume: 2.423, change: -124, timestamp: Date.now() },
    { pair: '2-1', base: '2', target: '1', price: 124.3, volume: 24.6, change: 765.24, timestamp: Date.now() },
    { pair: '3-1', base: '3', target: '1', price: 42.62, volume: 35.3, change: 1247.4, timestamp: Date.now() },
    { pair: '4-1', base: '4', target: '1', price: 32.6, volume: 75.4, change: 46.4, timestamp: Date.now() },
    { pair: '5-1', base: '5', target: '1', price: 634.5, volume: 24.3, change: 64.5, timestamp: Date.now() },
    { pair: '6-1', base: '6', target: '1', price: 24.7, volume: 65.3, change: 23.5, timestamp: Date.now() },
    { pair: '7-1', base: '7', target: '1', price: 86.9, volume: 74.4, change: -24.5, timestamp: Date.now() },
    { pair: '1-1', base: '1', target: '1', price: 0.299, volume: 2.423, change: -124, timestamp: Date.now() - 100 },
    { pair: '2-1', base: '2', target: '1', price: 124.3, volume: 24.6, change: 765.24, timestamp: Date.now() - 100 },
    { pair: '3-1', base: '3', target: '1', price: 42.62, volume: 35.3, change: 1247.4, timestamp: Date.now() - 100 },
    { pair: '4-1', base: '4', target: '1', price: 32.6, volume: 75.4, change: 46.4, timestamp: Date.now() - 100 },
    { pair: '5-1', base: '5', target: '1', price: 634.5, volume: 24.3, change: 64.5, timestamp: Date.now() - 100 },
    { pair: '6-1', base: '6', target: '1', price: 24.7, volume: 65.3, change: 23.5, timestamp: Date.now() - 100 },
    { pair: '7-1', base: '7', target: '1', price: 86.9, volume: 74.4, change: -24.5, timestamp: Date.now() - 100 },
];

const newestData = sampleData.slice(0, 7);

beforeAll(async () => {
    await mockgoose.prepareStorage();
    mongoose.connect(`mongodb://${uuid}`, {
        useMongoClient: true
    });
    await new Promise((resolve) => {
        mongoose.connection.on('connected', resolve);
    });
    // the insert method will add _id field
    return Price.collection.insert(sampleData.map((data) => Object.assign({}, data)));
});

test('should get from cache if exists', async () => {
    redisClient._clean();
    const cacheData = newestData.concat(['extra']);
    await redisClient.setAsync(cacheKey, JSON.stringify(cacheData));

    const data = await getData();

    expect(data).toEqual(cacheData);
});

test('should get the newest data from DB if not exists, and cache it back', async () => {
    redisClient._clean();
    const data = await getData();
    expect(data).toEqual(newestData);

    const cachedData = await getData();
    expect(cachedData).toEqual(newestData);
});

afterAll(async() => {
    await mockgoose.helper.reset();
    return mongoose.disconnect();
});