var path = require('path');
var webpack = require('webpack');
var kotlinLoader = require.resolve('../../loader');

module.exports = {
    context: __dirname,
    'devtool': 'source-map',
    entry: {
        main: './entry',
        vendor: ['kotlin']
    },
    output: {
        path: __dirname + '/dist',
        filename: 'build.js'
    },
    resolve: {
        alias: {
            'kotlin': require.resolve('../../kotlin-runtime')
        }
    },
    module: {
        loaders: [
            {test: /\.kt$/, loaders: [kotlinLoader]}
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.build.js'
        })
    ]
};
