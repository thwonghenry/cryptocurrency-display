const mongoose = require('mongoose');
mongoose.Promise = Promise;
const { Mockgoose } = require('mockgoose');
const mockgoose = new Mockgoose(mongoose);
const uuid = require('uuid/v1');

const Price = require('../db/Price');
const saveToDB = require('./saveToDB');

const sampleData = [
    { pair: '1-1', base: '1', target: '1', price: 0.299, volume: 2.423, change: -124, timestamp: Date.now() },
    { pair: '2-1', base: '2', target: '1', price: 124.3, volume: 24.6, change: 765.24, timestamp: Date.now() },
    { pair: '3-1', base: '3', target: '1', price: 42.62, volume: 35.3, change: 1247.4, timestamp: Date.now() },
    { pair: '4-1', base: '4', target: '1', price: 32.6, volume: 75.4, change: 46.4, timestamp: Date.now() },
    { pair: '5-1', base: '5', target: '1', price: 634.5, volume: 24.3, change: 64.5, timestamp: Date.now() },
    { pair: '6-1', base: '6', target: '1', price: 24.7, volume: 65.3, change: 23.5, timestamp: Date.now() },
    { pair: '7-1', base: '7', target: '1', price: 86.9, volume: 74.4, change: -24.5, timestamp: Date.now() },
];

beforeAll(async () => {
    await mockgoose.prepareStorage();
    mongoose.connect(`mongodb://${uuid}`, {
        useMongoClient: true
    });
    return new Promise((resolve) => {
        mongoose.connection.on('connected', resolve);
    });
});

test('should save data to DB', async () => {
    // insert query will add the _id field in the same reference for each row.. need to clone new one
    const cloneSample = sampleData.map((row) => Object.assign({}, row));
    await saveToDB(cloneSample);
    const data = await Price.find().select('-_id').exec();
    // the data is not native object, need to transform it
    expect(data.map((row) => ({
        pair: row.pair,
        base: row.base,
        target: row.target,
        price: row.price,
        volume: row.volume,
        change: row.change,
        timestamp: row.timestamp
    }))).toEqual(sampleData);
});

test('should not insert duplicated rows', async () => {
    const cloneSample = sampleData.map((row) => Object.assign({}, row));
    saveToDB(cloneSample).catch((error) => {
        expect(error.code).toBe(11000);
    });
});

test('should not insert unknown field', async () => {
    const cloneSample = sampleData.map((row) => Object.assign({ extra: 'extra' }, row));
    saveToDB(cloneSample).catch((error) => {
        expect(error.code).toBe(11000);
    });
});

afterAll(async() => {
    await mockgoose.helper.reset();
    return mongoose.disconnect();
});