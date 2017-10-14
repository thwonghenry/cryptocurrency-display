const getLatestData = require('./functions/getLatestData');
const saveToDB = require('./functions/saveToDB');
const updateRedisCache = require('./functions/updateRedisCache');

module.exports = async() => {
    const data = await getLatestData();
    updateRedisCache(data).catch((/* error */) => {
        // alert the error to third party service
    });
    saveToDB(data).catch((/* error */) => {
        // alert the error to third party service
    });
};