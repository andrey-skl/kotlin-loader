var kotlinCopiler = require('./kotlin-compiler');

module.exports = function () {
    this.cacheable();
    var callback = this.async();
    var filename = this.resourcePath;

    kotlinCopiler.compile(filename)
        .then(function (res) {
            callback(null, res)
        })
        .catch(callback);
};