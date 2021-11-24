"use strict";
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const webpackConfig = {
    devtool: "source-map",
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../../", "src/public/assets"),
                    to: path.resolve(__dirname, "../../", "dist/assets")
                }
            ]
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            extractComments: false,
            parallel: true,
            sourceMap: true,
            test: /\.js(\?.*)?$/i,
        })],
    },
};

module.exports = webpackConfig;