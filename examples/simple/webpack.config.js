var path = require('path');

var kotlinLoader = require.resolve('../../loader');

module.exports = {
    context: __dirname,
    entry: './entry',
    output: {
        path: __dirname + '/dist',
        filename: 'build.js'
    },
    module: {
        loaders: [
            {test: /\.kt$/, loaders: [kotlinLoader]}
        ]
    }
};
