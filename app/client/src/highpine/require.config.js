/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

/**
 * Will be merged by Grunt into the basic configuration.
 */
module.exports = {
    paths: {
        'angular-route': '/vendor/angular-route/angular-route.min',
        'angular-resource': '/vendor/angular-resource/angular-resource.min',
        'angular-messages': '/vendor/angular-messages/angular-messages.min',
        'angular-ui-router': '/vendor/@uirouter/angularjs/release/angular-ui-router.min',
        'ngstorage': '/vendor/ngstorage/ngStorage.min',
        'async': '/vendor/async/dist/async',
        'moment': '/vendor/moment/moment',
        'moment-adapter': 'highpine/moment-adapter',
        'chart': '/vendor/chart.js/dist/Chart',
        'angular-chart': '/vendor/angular-chart.js/dist/angular-chart.min',
        'waypoints': '/vendor/waypoints/lib/jquery.waypoints'
    },
    shim: {
        'angular-route': ['angular'],
        'angular-resource': ['angular'],
        'angular-messages': ['angular'],
        'angular-ui-router': ['angular'],
        'ngstorage': ['angular'],
        'angular-chart': ['angular', 'chart'],
        'moment': {exports: 'moment'},
        'chart': ['moment'],
        'waypoints': ['jquery']
    },
    map: {
        '*': {
            'moment': 'moment-adapter'
        },
        'moment-adapter': {
            'moment': 'moment'
        },
        'moment': {
            'moment': 'moment'
        }
    }
};