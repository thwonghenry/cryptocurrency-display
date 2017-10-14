jest.mock('../api/getData', () => (pairs) => new Promise((resolve) => {
    resolve(
        pairs.map((pair) => {
            const pairMatch = pair.match(/^(.*)-(.*)$/);
            const base = pairMatch[1].toUpperCase();
            const target = pairMatch[2].toUpperCase();
            return { base, target };
        })
    );
}));

jest.mock('../lib/wait', () => () => {});

jest.mock('../config.json', () => ({
    'pairs': [
        '1-1',
        '2-1',
        '3-1',
        '4-1',
        '5-1',
        '6-1',
        '7-1',
        '8-1',
        '9-1',
        '10-1',
        '11-1'
    ]
}));

test('The response should be correct format and flatten', async () => {
    const getLatestData = require('./getLatestData');

    const expectedResult = [
        { base: '1', target: '1' },
        { base: '2', target: '1' },
        { base: '3', target: '1' },
        { base: '4', target: '1' },
        { base: '5', target: '1' },
        { base: '6', target: '1' },
        { base: '7', target: '1' },
        { base: '8', target: '1' },
        { base: '9', target: '1' },
        { base: '10', target: '1' },
        { base: '11', target: '1' }
    ];

    const result = await getLatestData();
    expect(result).toEqual(expectedResult);
});