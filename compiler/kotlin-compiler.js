var spawn = require('child_process').spawn;
var fs = require('fs');

var TMP_FILE_NAME = `${__dirname}/_tmp.js`;

function onCompilationFinish() {
    return new Promise(function (resolve, reject) {
        fs.readFile(TMP_FILE_NAME, function (err, data) {
            if (err) {
                return reject(err);
            }
            fs.unlink(TMP_FILE_NAME, function () {
                resolve(data);
            });
        });
    });

}

function compile(sourceFilePath) {
    return new Promise(function (resolve, reject) {
        var compilation = spawn(__dirname + `/bin/kotlinc-js`,
            [
                '-output', 
                TMP_FILE_NAME, 
                '-module-kind',
                'commonjs',

                sourceFilePath
            ], 
            {stdio: [process.stdin, process.stdout, 'pipe']}
        );
        var hasErrors = false;
        var errors = '';

        compilation.stderr.on('data', function (data) {
            hasErrors = true;
            errors += data.toString();
        });

        compilation.on('error', function (err) {
            hasErrors = true;
            errors += 'kotlin-js failed. do you have kotlin installed?';
            errors += JSON.stringify(err);
        });

        compilation.on('close', function () {
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