const express = require('express');
const cors = require('cors');

const server = express();
const promisify = require('./lib/promisify');

const router = require('./router');

const dbInit = require('./db/init');

(async () => {
    dbInit();
    server.use(cors());
    server.use(express.json());
    server.use(router);

    await promisify(server, 'listen')(8000);
    console.log(`${server.name} is up!`);
})();

