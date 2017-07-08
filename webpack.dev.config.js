const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'week': ['./src/week.js'],
        'month': ['./src/month.js']
    },
    output: {
        path: path.join(__dirname, ""),
        publicPath: '/dist/',
        filename: '[name].js'
    },
    devtool: '#eval-source-map',
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015']
            },
            include: [
                path.resolve(__dirname, "src"),
            ],
        }, {
            test: /\.scss$/,
            loaders: ["style", "css", "sass"]
        }, {
            test: /\.html$/,
            loader: "html-loader"
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: 'url-loader?limit=20&name=images/[hash:8].[name].[ext]'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.scss', '.vue'],
        modules: ["node_modules"]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
