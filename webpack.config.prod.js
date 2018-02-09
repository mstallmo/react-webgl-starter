import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

export default {
    devtool: 'source-map',
    entry: './src/index',
    target: 'web',
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase:'./dist'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
        new ExtractTextPlugin('styles.css'),
        new UglifyJsPlugin({
            uglifyOptions: {
                sourceMap: true,
                compress: {
                    warnings: false
                },
                output: {comments: false}
            }
        })
    ],
    module: {
        loaders: [
            {test: /\.js$/, include: path.join(__dirname, 'src'), loader: 'babel-loader'},
            {test: /(\.css)$/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader', publicPath: '/dist'})},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
            {test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'},
            {test: /\.(png|jpg|gif)$/, include: path.join(__dirname, 'images'), loader: 'url-loader?limit=8192'},
            {test: /\.glsl$/, include: path.join(__dirname, 'src'), loader: 'webpack-glsl-loader'},
            {test: /\.json$/, include: path.join(__dirname, 'data'), loader: 'json-loader'}
        ]
    }
};