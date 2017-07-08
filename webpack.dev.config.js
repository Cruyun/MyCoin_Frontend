const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = {
    entry: {
        'week.js': ['./src/week.js'],
        'month.js': ['./src/month.js'],
        'list.js': ['./src/list.js'],
        vendor: ["vue", "whatwg-fetch"]

    },
    output: {
        path: path.join(__dirname, ""),
        publicPath: '/static/',
        filename: '[name]'
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
    },
    plugins: [
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'template/base.html',
            inject: false,
            template: './template/base.ejs',
            chunks: ['vendor']
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'template/week.html',
            inject: false,
            template: './template/week.ejs',
            chunks: ['week.js']
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'template/month.html',
            inject: false,
            template: './template/month.ejs',
            chunks: ['month.js']
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'template/list.html',
            inject: false,
            template: './template/list.ejs',
            chunks: ['list.js']
        }),
        new HtmlWebpackHarddiskPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js")
    ]
};
