var spawn = require('child_process').spawn;
var fs = require('fs');

var TMP_FILE_NAME = `${__dirname}/_tmp.js`;

function onCompilationFinish() {
    return new Promise((resolve, reject) => {

        fs.readFile(`${TMP_FILE_NAME}.map`, (err, sourceMapBuffer) => {
            fs.readFile(TMP_FILE_NAME, (err, compiledSourceBuffer) => {
                if (err) {
                    return reject(err);
                }
                const sourceMap = JSON.parse(sourceMapBuffer.toString());
                const compiledSource = compiledSourceBuffer.toString();

                resolve({sourceMap, compiledSource});
            });
        });
    });

}

function compile(sourceFilePath) {
    return new Promise((resolve, reject) => {
        var compilation = spawn(__dirname + `/bin/kotlinc-js`,
            [
                '-output',
                TMP_FILE_NAME,
                '-source-map',
                '-module-kind',
                'commonjs',

                sourceFilePath
            ],
            {stdio: [process.stdin, process.stdout, 'pipe']}
        );
        var hasErrors = false;
        var errors = '';

        compilation.stderr.on('data', (data) => {
            hasErrors = true;
            errors += data.toString();
        });

        compilation.on('error', (err) => {
            hasErrors = true;
            errors += 'kotlin-js failed. do you have kotlin installed?';
            errors += JSON.stringify(err);
        });

        compilation.on('close', () => {
            if (hasErrors === false) {
                resolve(onCompilationFinish());
            } else {
                console.error('\n kotlin-js compilation failed. \n', errors);
                reject(errors);
            }
        });
    });
}

module.exports = {
    compile: compile
};