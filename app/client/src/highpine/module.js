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
    'highpine/packages-loader',

    // add highpine core packages below
    '@shared/alert',
    '@shared/modal',
    '@shared/data-source',

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
    packagesLoader,
    ...setups
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
    highpine.config(function ($httpProvider, $locationProvider, $qProvider, $resourceProvider) {

        $locationProvider.html5Mode(true);
        $qProvider.errorOnUnhandledRejections(false);

        // Backend is located on another domain, so we need to allow cookies in Cross-Origin requests.
        $httpProvider.defaults.withCredentials = true;

        $resourceProvider.defaults.actions = {
            'get':    {method: 'GET'},
            'create': {method: 'POST'},
            'update': {method: 'PUT'},
            'query':  {method: 'GET', isArray: true},
            'remove': {method: 'DELETE'},
            'delete': {method: 'DELETE'}
        };
    });

    /*
     * Initializing components.
     */
    let packages = packagesLoader(...setups);
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