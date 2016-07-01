var loaderUtils = require('loader-utils');
var kotlinCopiler = require('./compiler/kotlin-compiler');

module.exports = function () {
    this.cacheable();
    var callback = this.async();
    var filename = loaderUtils.getRemainingRequest(this);
    this.addDependency(filename);

    kotlinCopiler.compile(filename)
        .then(function (res) {
            callback(null, res)
        })
        .catch(callback);
};