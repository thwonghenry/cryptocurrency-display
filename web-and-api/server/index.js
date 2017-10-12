const express = require('express');
const path = require('path');

const server = express();
const promisify = require('./lib/promisify');

const isDevEnv = process.env.NODE_ENV === 'development';

const router = require('./middlewares/router');

(async () => {
    if (isDevEnv) {
        const devMiddleware = require('./middlewares/devMiddleware');
        await new Promise((resolve) => {
            devMiddleware.waitUntilValid(resolve);
        });
        server.use(devMiddleware);
        console.log('webpack done');
    }
    server.use(express.static(path.resolve('..', 'public')));
    server.use(express.json());
    server.use(router);
    const port = process.env.PORT || 8000;

    await promisify(server, 'listen')(port);
    console.log(`${server.name} is up!`);
})();

