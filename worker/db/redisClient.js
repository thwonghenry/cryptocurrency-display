const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient(process.env.REDIS_URL);

client.setAsync = promisify(client.set).bind(client);

module.exports = client;
