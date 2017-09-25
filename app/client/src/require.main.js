let baseRequireConfig = {
    paths: {
        'angular': '/vendor/angular/angular.min',
        'bootstrap': '/vendor/bootstrap/dist/js/bootstrap.min',
        'jquery': '/vendor/jquery/dist/jquery.min',
    },
    shim: {
        'angular': {exports: 'angular'},
        'bootstrap': ['jquery'],
    },
    packages: [],
    deps: [],
    map: {}
};

require(['app/require.config'], function(customizeRequireConfig) {

    require.config(customizeRequireConfig(baseRequireConfig));

    require([
        'angular',
        'bootstrap',
        'app/module'
    ], function(angular) {
        angular.element(document).ready(function() {
            angular.bootstrap(document, ['app']);
        });
    });
});