var loaderUtils = require('loader-utils');
var kotlinCopiler = require('./compiler/kotlin-compiler');
var sourceMapResolve = require("source-map-resolve")
var fs = require('fs');
var path = require('path');

var SOURCE_MAP_RELATED_PATH = path.resolve('./', './compiler/doesnt-matter.js');

function fillEmptySourcesContent(compileRes) {
    return new Promise((resolve, reject) => {
        sourceMapResolve.resolveSources(compileRes.sourceMap, SOURCE_MAP_RELATED_PATH, fs.readFile, (error, res) => {
            if (error) {
                return reject(error);
            }
            compileRes.sourceMap.sourcesContent = res.sourcesContent;

            resolve(compileRes);
        });
    });
}

module.exports = function (sourceCode) {
    this.cacheable();
    const addDependency = this.addDependency.bind(this);
    const query = loaderUtils.parseQuery(this.query);
    const callback = this.async();

    if (!callback) {
        throw 'webpack-kotlin-loader currently only supports async mode.';
    }

    const filename = loaderUtils.getRemainingRequest(this);

    const sourcePathes = [filename, query.srcRoot].concat(query.srcRoots).filter(str => !!str);

    kotlinCopiler.compile({
        sources: sourcePathes,
        sourceMaps: true,
        moduleKind: 'commonjs',
        libraryFiles: query.libraryFiles || []
    })
        .then(fillEmptySourcesContent)
        .then(result => {
            result.sourceMap.sources.forEach(addDependency);
            return result;
        })
        .then(result => callback(null, result.compiledSource, result.sourceMap))
        .catch(callback);
};