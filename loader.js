var loaderUtils = require('loader-utils');
var kotlinCopiler = require('./compiler/kotlin-compiler');

module.exports = function (source) {
    this.cacheable();
    var callback = this.async();

    if (!callback) {
        throw 'webpack-kotlin-loader currently only supports async mode.';
    }

    var filename = loaderUtils.getRemainingRequest(this);
    this.addDependency(filename);

    kotlinCopiler.compile(filename)
        .then(res => {
            var resultSourceMap = res.sourceMap;
            resultSourceMap.sourcesContent = [source];
            callback(null, res.compiledSource, resultSourceMap);
        })
        .catch(callback);
};