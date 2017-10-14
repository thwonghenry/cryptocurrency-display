const getLatestData = require('./functions/getLatestData');

module.exports = async() => {
    const data = await getLatestData();
    console.log(data);
};