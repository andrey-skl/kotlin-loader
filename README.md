# kotlin-loader

###Kotlin webpack loader that allows importing Kotlin package into your JS

See [examples](https://github.com/huston007/kotlin-loader/tree/master/examples/simple).

Usage:

```sh
npm i webpack-kotlin-loader --save-dev
```

Do not forget to install kotlin runtime:
```sh
npm i kotlin --save
```

Usage:
`webpack.config.js`
```js
var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: 'source-map',
    entry: {
        main: './entry'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /\.kt$/,
                loaders: [
                    'webpack-kotlin-loader?' + JSON.stringify({
                        srcRoot: path.resolve(__dirname, './src'),
                        libraryFiles: [path.resolve(__dirname, './lib/reakt.jar')]
                    })
                ]
            }
        ]
    }
};
```
Where `srcRoot` should be set to root directory which contains your kotlin sources.

Then you could import your kotlin entry point somewhere:
```js
require('./app/app.kt');
```