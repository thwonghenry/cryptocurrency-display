const path = require('path');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssConfig = require('./postcss.config');

const rootDir = __dirname;

const env = process.env.NODE_ENV;

const cssLoaderOptions = {
    modules: true,
    importLoaders: 1 // support postcss loader
};

const config = {
    entry: [
        'babel-polyfill',
        'promise-polyfill',
        'whatwg-fetch',
        path.resolve(rootDir, 'src', './index.jsx'),
    ],
    output: {
        path: path.resolve(rootDir, 'public'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: ['node_modules'],
            use: [
                'babel-loader',
            ]
        }, {
            test: /\.scss/,
            exclude: ['node_modules'],
            use: [{
                loader: 'style-loader'
            },
            {
                loader: 'css-loader',
                options: cssLoaderOptions
            },
            {
                loader: 'postcss-loader',
                options: postcssConfig
            },
            {
                loader: 'sass-loader'
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Cryptocurrency Conversions',
            filename: path.resolve(rootDir, 'public', './index.html'),
            template: path.resolve(rootDir, 'src', './index.ejs'),
            minify: env === 'production' ? {
                removeComments: true,
                collapseWhitespace: true
            } : false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                API_ENDPOINT: JSON.stringify(process.env.API_ENDPOINT)
            }
        })
    ]
};

if (env === 'development') {
    config.devtool = 'inline-source-map';
} else {
    config.plugins = [
        ...(config.plugins || []),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new MinifyPlugin()
    ];
}

module.exports = config;