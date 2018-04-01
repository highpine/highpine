/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

/**
 * Will be used by Grunt as a basic configuration for merging.
 */
module.exports = {
    app: {
        name: 'app',
        path: 'app/module',
    },
    paths: {
        'angular': '/vendor/angular/angular.min',
        'bootstrap': '/vendor/bootstrap/dist/js/bootstrap.bundle.min',
        'jquery': '/vendor/jquery/dist/jquery.min',
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'bootstrap': ['jquery'],
    },
    packages: [],
    deps: [],
    map: {}
};