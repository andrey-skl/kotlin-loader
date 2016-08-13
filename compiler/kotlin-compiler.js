const spawn = require('child_process').spawn;
const fs = require('fs');

const TMP_FILE_NAME = `${__dirname}/_compiled-tmp.js`;
const TMP_SOURCE_MAP_FILE_NAME = `${TMP_FILE_NAME}.map`;
const FILE_PROTO_PREFIX = 'file://';

const TURN_ON_RED_COLOR = '\033[31m';
const RESET_COLOR = '\033[0m';

function dropFilePrefixFromSourceUrls(sources) {
    return sources.map(path => {
        if (path.indexOf(FILE_PROTO_PREFIX) === 0) {
            return path.split(FILE_PROTO_PREFIX)[1];
        }
        return path;
    });
}

function onCompilationFinish() {
    return new Promise((resolve, reject) => {

        fs.readFile(TMP_SOURCE_MAP_FILE_NAME, (err, sourceMapBuffer) => {
            fs.readFile(TMP_FILE_NAME, (err, compiledSourceBuffer) => {
                if (err) {
                    return reject(err);
                }
                const compiledSource = compiledSourceBuffer.toString();
                const sourceMap = JSON.parse(sourceMapBuffer.toString());

                sourceMap.sources = dropFilePrefixFromSourceUrls(sourceMap.sources);

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
                console.error(TURN_ON_RED_COLOR, '\n kotlin-js compilation failed. \n', errors, RESET_COLOR);
                reject(errors);
            }
        });
    });
}

module.exports = {
    compile: compile
};