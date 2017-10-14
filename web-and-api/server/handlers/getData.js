const redisClient = require('../db/redisClient');
const Price = require('../db/Price');
const cacheKey = process.env.REDIS_LATEST_CACHE_KEY;

const getNewestDataFromDB = async () => {
    const data = await new Promise((resolve, reject) => {
        const data = [];
        try {
            const cursor = Price.aggregate()
                .sort({ pair: 1, timestamp: -1})
                .group({
                    _id: '$pair',
                    base: { '$first': '$base' },
                    target: { '$first': '$target' },
                    price: { '$first': '$price' },
                    volume: { '$first': '$volume' },
                    change: { '$first': '$change' },
                    timestamp: { '$first': '$timestamp' },
                })
                .cursor({})
                .exec();
            cursor.each(function(error, doc) {
                if (error) {
                    reject(error);
                    return;
                }
                if (doc) {
                    data.push({
                        pair: doc._id,
                        base: doc.base,
                        target: doc.target,
                        price: doc.price,
                        volume: doc.volume,
                        change: doc.change,
                        timestamp: doc.timestamp
                    });
                } else {
                    resolve(data);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
    data.sort((a, b) => {
        if (a.pair > b.pair) {
            return 1;
        } else {
            return -1;
        }
    });
    return data;
};

module.exports = async () => {
    let data = await redisClient.getAsync(cacheKey);

    if (!data) {
        data = await getNewestDataFromDB();
        // make sure the cache is set for next request
        await redisClient.setAsync(cacheKey, JSON.stringify(data));
    } else {
        data = JSON.parse(data);
    }

    return data;
};
