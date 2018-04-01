/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

let fs = require('fs');
let path = require('path');

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target, source) {
    let output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, { [key]: source[key] });
                else
                    output[key] = mergeDeep(target[key], source[key]);
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
}

module.exports = function(grunt) {
    grunt.registerMultiTask(
        'compile-requirejs-config',
        'Merges require.config.js files into single configuration file: require.config.compiled.js',
        function() {

            let requireConfig = {};
            let configFiles = this.data.src;
            let destination = this.data.dest;

            configFiles.forEach(filePath => {
                requireConfig = mergeDeep(requireConfig, require(path.resolve(filePath)));
            });

            fs.writeFileSync(destination, 'define(' + JSON.stringify(requireConfig, null, 4) + ');');
        }
    );
};