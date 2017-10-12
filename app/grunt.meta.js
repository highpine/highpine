module.exports = {
    backendUrl: 'http://localhost:3031',
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
            '@uirouter/angularjs/release/angular-ui-router.min.js',
            '@uirouter/angularjs/release/angular-ui-router.min.js.map',
            'ngstorage/ngStorage.min.js',
            'bootstrap/dist/js/bootstrap.min.js',
            'async/lib/async.js',
            'moment/min/moment.min.js',
            'moment/moment.js',
            'chart.js/dist/Chart.js',
            'chart.js/dist/Chart.min.js',
            'angular-chart.js/dist/angular-chart.min.js',
            'angular-chart.js/dist/angular-chart.min.js.map',
            'marked/marked.min.js',
            'angular-marked/dist/angular-marked.min.js'
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
        ],
        tpl: []
    }
};