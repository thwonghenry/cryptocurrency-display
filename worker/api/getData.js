require('isomorphic-fetch');
const wait = require('../lib/wait');
const { waitBetweenRequest } = require('../config.json');

const fetchData = async (pair, trial = 5) => {
    if (!trial) {
        throw new Error('Cannot request after 5 trials');
    }
    try {
        const response = await fetch(`https://api.cryptonator.com/api/ticker/${pair}`);
        if (!response.ok) {
            throw response;
        }
        return await response.json();
    } catch (error) {
        // The API has call frequency limit, need to retry if hit the limit
        console.log('error', error);
        await wait(waitBetweenRequest);
        return fetchData(pair, --trial);
    }
};

module.exports = async (pairs) => {
    const data = await Promise.all(pairs.map(async (pair) => {
        const json = await fetchData(pair);
        return Object.assign({
            timestamp: json.timestamp
        }, json.ticker);
    }));
    return data;
};
