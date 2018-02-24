const redis = require('redis');
const promisify = require('../lib/promisify');

const client = redis.createClient(process.env.REDIS_URL || '//redis:6379');

client.getAsync = promisify(client, 'get');
client.setAsync = promisify(client, 'set');

module.exports = client;