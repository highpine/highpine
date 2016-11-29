var basicMeta = {
    backendUrl: 'http://highpine-server.me:3030',
    vendor: {
        cwd: 'node_modules',
        js: [
            'requirejs/require.js',
            'jquery/dist/jquery.min.js',
            'jquery/dist/jquery.min.js.map',
            'angular/angular.min.js',
            'angular/angular.min.js.map',
            'angular-route/angular-route.min.js',
            'angular-route/angular-route.min.js.map',
            'angular-messages/angular-messages.min.js',
            'angular-messages/angular-messages.min.js.map',
            'angular-resource/angular-resource.min.js',
            'angular-resource/angular-resource.min.js.map',
            'angular-ui-router/release/angular-ui-router.min.js',
            'ngstorage/ngStorage.min.js',
            'bootstrap/dist/js/bootstrap.min.js',
            'async/lib/async.js',
            'moment/min/moment.min.js',
            'moment/moment.js',
            'chart.js/dist/Chart.js',
            'chart.js/dist/Chart.min.js',
            'angular-chart.js/dist/angular-chart.min.js',
            'angular-chart.js/dist/angular-chart.min.js.map'
        ],
        css: [
            'angular/angular-csp.css',
            'bootstrap/dist/css/bootstrap.min.css',
            'bootstrap/dist/css/bootstrap.min.css.map',
            'bootstrap/dist/css/bootstrap-theme.min.css',
            'bootstrap/dist/css/bootstrap-theme.min.css.map'
        ],
        fonts: [
            'bootstrap/dist/fonts/*'
        ]
    },
    // client packages included as node modules:
    clientPackages: {
        names: [
            //'client-shared-fecru'
        ]
    }
};

var extend = require('util')._extend;
function mergeMeta(basicMeta, packageMeta) {
    var mergedMeta = extend({}, basicMeta);
    for (let section of ['js', 'css', 'fonts']) {
        if (packageMeta.vendor && packageMeta.vendor[section]) {
            mergedMeta.vendor[section] = mergedMeta.vendor[section].concat(packageMeta.vendor[section]);
        }
    }
    return mergedMeta;
}

var packages = require('./grunt.packages.js');
var mergedMeta = packages.reduce(function(mergedMeta, packagePath) {
    try {
        var packageMeta = require('./' + packagePath + '/.grunt.meta.js');
        return mergeMeta(mergedMeta, packageMeta);
    } catch (e) {
        console.log(packagePath + ' doesn\'t have a .grunt.meta.js file.');
    }
    return mergedMeta;
}, basicMeta);

module.exports = mergedMeta;