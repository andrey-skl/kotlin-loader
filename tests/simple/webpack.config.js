var path = require('path');

module.exports = {
    context: __dirname,
    entry: './entry',
    output: {
        path: __dirname + '/dist',
        filename: 'build.js'
    },
    resolveLoader: {
        fallback: path.resolve(__dirname, '../../')
    },
    module: {
        loaders: [
            {test: /\.kt$/, loaders: ['loader']}
        ]
    }
};
