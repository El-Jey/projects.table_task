'use strict';
const { merge } = require('webpack-merge');
const commonConfig = require('./config/webpack.config.common');
const developmentConfig = require('./config/webpack.config.dev');
const productionConfig = require('./config/webpack.config.prod');

module.exports = (env, argv) => {
    switch (argv.mode) {
        case 'development':
            return merge(commonConfig, developmentConfig);
        case 'production':
            return merge(commonConfig, productionConfig);
        default:
            throw new Error('No matching webpack configuration found!');
    }
}