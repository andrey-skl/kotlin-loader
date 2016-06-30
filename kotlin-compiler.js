var spawn = require('child_process').spawn;
var fs = require('fs');

var TMP_FILE_NAME = `${__dirname}/_tmp.js`;

function onCompilationFinish() {
    return new Promise(function (resolve) {
        fs.readFile(TMP_FILE_NAME, function (err, data) {
            if (err) {
                throw err;
            }
            resolve(data);
        });
    });

}

function compile(sourceFilePath) {
    return new Promise(function (resolve, reject) {
        var make = spawn('kotlinc-js', ['-output', TMP_FILE_NAME, '-meta-info', sourceFilePath], {stdio: [process.stdin, process.stdout, 'pipe']});
        var hasErrors = false;
        var errors = '';

        make.stderr.on('data', function (data) {
            hasErrors = true;
            errors += data.toString();
        });

        make.on('close', function () {
            if (hasErrors === false) {
                resolve(onCompilationFinish());
            } else {
                console.error('\n kotlin-js compilation failed. \n');
                console.error(errors);
                reject(errors);
            }
        });
    });
}

module.exports = {
    compile: compile
};