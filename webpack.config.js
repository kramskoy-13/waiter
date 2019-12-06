const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || "development";
const PROCESS = process.env.npm_lifecycle_event;

module.exports = {

    mode: PROCESS === "build"? "production" : 'development',

    entry: {
        app: './js/entry.js'
    },

    output: {
        filename: '[name].bundle.[contenthash].js',
        path: path.resolve(__dirname, 'build/js')
    },

    devtool: 'inline-source-map',

    devServer: {
        contentBase: './',
        historyApiFallback: true
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './template/index.html',
            filename: '../../index.html'
        })
    ]

};
/// IF BUILD COMMAND USED - CLEAR THE DIRECTORY ///
if (PROCESS === "build") {
    module.exports.plugins.push(
        new CleanWebpackPlugin()
    )
}


