var execSync = require('child_process').execSync;
var fs = require('fs');

module.exports = function() {
    var filename = this.resourcePath;

    execSync(`kotlinc-js -output ${__dirname}/_tmp.js -meta-info ${filename}`);

    var result = fs.readFileSync(__dirname + '/_tmp.js');

    execSync(`rm ${__dirname}/_tmp.js`);

    return result;
};