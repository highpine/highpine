require.config({
    paths: {
        angular: '/vendor/angular/angular.min',
        angularRoute: '/vendor/angular-route/angular-route.min',
        angularResource: '/vendor/angular-resource/angular-resource.min',
        angularMessages: '/vendor/angular-messages/angular-messages.min',
        angularUiRouter: '/vendor/angular-ui-router/release/angular-ui-router.min',
        ngStorage: '/vendor/ngstorage/ngStorage.min',
        bootstrap: '/vendor/bootstrap/dist/js/bootstrap.min',
        jquery: '/vendor/jquery/dist/jquery.min'
    },
    shim: {
        angular : {'exports' : 'angular'},
        angularRoute: ['angular'],
        angularResource: ['angular'],
        angularMessages: ['angular'],
        angularUiRouter: ['angular'],
        ngStorage: ['angular'],
        bootstrap: ['jquery']
    },
    //priority: [
    //    "angular"
    //],
    deps: [],
    baseUrl: '/javascripts'
});


require([
    'angular',
    'bootstrap',
    'dl-tools/module'
], function(angular) {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['DlTools']);
    });
});