/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

let fs = require('fs');
let path = require('path');

module.exports = function(grunt) {
    grunt.registerMultiTask(
        'compile-requirejs-packages-map',
        'Compile a packages map for requirejs config.',
        function() {

            let map = this.files.reduce((result, mapping) => {
                let packages = mapping.src;
                let namespace = mapping.namespace || '';
                let pathPrefix = mapping.pathPrefix || '';
                let main = mapping.main || 'index';

                return result.concat(packages.map(package => ({
                    name: namespace + (namespace ? '/' : '') + path.basename(package),
                    location: pathPrefix + package,
                    main: main
                })));
            }, []);

            console.log(this);
            let destination = this.data.destination;
            fs.writeFileSync(destination, 'module.exports = { packages: ' + JSON.stringify(map, null, 4) + '};');
        }
    );
};