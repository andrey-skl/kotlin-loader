var loaderUtils = require('loader-utils');
var kotlinCopiler = require('./compiler/kotlin-compiler');

module.exports = function () {
    this.cacheable();
    var callback = this.async();
    var filename = loaderUtils.getRemainingRequest(this);
    this.addDependency(filename);

    kotlinCopiler.compile(filename)
        .then(res => callback(null, res.compiledSource, res.sorceMap))
        .catch(callback);
};