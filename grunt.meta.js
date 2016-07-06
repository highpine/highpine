module.exports = {
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
            'bootstrap/dist/js/bootstrap.min.js'
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
    }
};