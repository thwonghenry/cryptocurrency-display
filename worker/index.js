const getLatestData = require('./functions/getLatestData');
const saveToDB = require('./functions/saveToDB');

module.exports = async() => {
    const data = await getLatestData();
    saveToDB(data).catch((/* error */) => {
        // alert the error to third party service
    });
    console.log(data);
};