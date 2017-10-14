const getData = require('../api/getData');
const { chunk, flatten } = require('lodash');
const Promise = require('bluebird');
const wait = require('../lib/wait');
const { waitBetweenRequest, pairs } = require('../config.json');

module.exports = async () => {
    const chunkedPairs = chunk(pairs, 5);
    const chunkedResponse = await Promise.mapSeries(chunkedPairs, async (pair, index) => {
        if (index) {
            // wait for each chunk to avoid request limit
            await wait(waitBetweenRequest);
        }
        return await getData(pair);
    });
    return flatten(chunkedResponse);
};
