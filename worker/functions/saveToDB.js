const Price = require('../db/Price');

module.exports = async (data) => {
    return await Price.collection.insert(data);
};