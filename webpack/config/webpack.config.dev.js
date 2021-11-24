"use strict";
const path = require("path");

const webpackConfig = {
    devtool: "eval-source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "../../", "src/public"),
        port: 7700,
        historyApiFallback: true,
        open: true,
    }
};

module.exports = webpackConfig;