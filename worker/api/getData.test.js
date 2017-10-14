require('isomorphic-fetch');
const fetchMock = require('fetch-mock');

const getData = require('./getData');
const { pairs } = require('../config.json');

fetchMock.get('begin:https://api.cryptonator.com/api/ticker/', async (url) => {
    const pairMatch = url.match(/^https:\/\/api\.cryptonator\.com\/api\/ticker\/(.*)-(.*)/);
    if (pairMatch && pairMatch.length > 1) {
        const base = pairMatch[1].toUpperCase();
        const target = pairMatch[2].toUpperCase();
        return {
            ticker: {
                base,
                target,
                price: 12345,
                volume: 12345,
                change: 12345,
            },
            timestamp: 1,
            success: true,
            error: ''
        };
    }
});

test('should transform data structure', async () => {
    expect(await getData(pairs)).toEqual(pairs.map((pair) => {
        const pairMatch = pair.match(/^(.*)-(.*)$/);
        const base = pairMatch[1].toUpperCase();
        const target = pairMatch[2].toUpperCase();
        return {
            pair,
            base, target,
            price: 12345,
            volume: 12345,
            change: 12345,
            timestamp: 1
        };
    }));
});