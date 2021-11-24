"use strict";
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

const webpackConfig = {
    entry: path.resolve(__dirname, "../../", "src/main.js"),
    output: {
        path: path.resolve(__dirname, "../../", "dist"),
        filename: "assets/js/[name].[hash].js",
        publicPath: "/"
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            "@": path.resolve(__dirname, "..", "..", "src")
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
            test: /\.js$/,
            use: "babel-loader",
            exclude: [
                /node_modules/
            ],
            include: path.resolve(__dirname, "../../", "src")
        },
        {
            test: /\.css$/,
            use: [{
                loader: "vue-style-loader"
            },
            {
                loader: "style-loader"
            },
            {
                loader: "css-loader"
            }
            ]
        },
        {
            test: /\.(sass|scss)$/,
            use: [{
                loader: "vue-style-loader"
            },
            {
                loader: "style-loader"
            },
            {
                loader: "css-loader"
            },
            {
                loader: "sass-loader",
                options: {
                    implementation: require('sass')
                }
            }
            ]
        },
        {
            test: /\.(png|jpe?g|gif|svg)$/i,
            use: [
                {
                    loader: 'file-loader',
                },
            ],
        },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../../", "src/public/index.html"),
            inject: "body"
        }),
        new VuetifyLoaderPlugin()
    ]
};

module.exports = webpackConfig;