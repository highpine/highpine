define([
    'angular',
    'angular-route',
    'angular-resource',
    'angular-ui-router',
    'ngstorage',
    'chart',
    'angular-chart',
    'moment',
    'config',
    'highpine/packages'
], function(
    angular,
    ngRoute,
    angularResource,
    angularUiRouter,
    ngStorage,
    chart,
    angularChart,
    moment,
    config,
    packages
) {
    let highpine = angular.module('highpine', [
        'ngRoute',
        'ngResource',
        'ngStorage',
        'ui.router',
        'chart.js'
    ]);

    /*
     * Set up general configuration.
     */
    highpine.value('config', config);
    highpine.constant('BACKEND_URL', config.backendUrl);
    highpine.constant('API_BASE_URL', config.backendUrl + '/api');

    /* @ngInject */
    highpine.config(function ($httpProvider, $locationProvider, $qProvider) {

        $locationProvider.html5Mode(true);
        $qProvider.errorOnUnhandledRejections(false);

        // Backend is located on another domain, so we need to allow cookies in Cross-Origin requests.
        $httpProvider.defaults.withCredentials = true;
    });

    /*
     * Initializing components.
     */
    packages.init(highpine);

    /* @ngInject */
    highpine.run(function ($injector) {
        /*
         * Running components.
         */
        packages.run(highpine, $injector);
    });

    return highpine;
});