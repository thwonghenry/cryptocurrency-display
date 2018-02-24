const express = require('express');
const path = require('path');

const server = express();

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const compiler = webpack(config);

const devMiddleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    historyApiFallback: true
});


server.use(devMiddleware);
server.use(express.static(path.resolve('public')));

server.listen(8000);
