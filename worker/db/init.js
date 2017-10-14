const mongoose = require('mongoose');

module.exports = async () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useMongoClient: true
    });
    await new Promise((resolve, reject) => {
        mongoose.connection.on('connected', resolve);
        mongoose.connection.on('error', reject);
    });
};