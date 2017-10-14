const Price = require('../db/Price');

module.exports = async (data) => {
    await Price.collection.insert(data);
};