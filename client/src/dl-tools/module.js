define([
    'angular',
    'angular-route',
    'angular-resource',
    'angular-ui-router',
    'ngstorage',
    'marked',
    'angular-marked',
    'chart',
    'angular-chart',
    'moment',

    'config',
    'dl-tools/load',
    'dl-tools/templates',
    'dl-tools/vendor-templates'
], function(
    angular, ngRoute, angularResource, angularUiRouter, ngStorage, marked, angularMarked, chart, angularChart,
    moment,

    config, load, templates, vendorTemplates
) {
    var dlTools = angular.module('DlTools', [
        'ngRoute',
        'ngResource',
        'ngStorage',
        'ui.router',
        'hc.marked',
        'chart.js',
        'dl-tools-templates',
        'dl-tools-vendor-templates'
    ]);

    /*
     * Common app configuration.
     */
    dlTools.constant('BACKEND_URL', config.backendUrl);
    dlTools.constant('API_BASE_URL', config.backendUrl + '/api');

    /* @ngInject */
    dlTools.config(function ($httpProvider, markedProvider) {

        // Backend is located on another domain, so we need to allow cookies in Cross-Origin requests.
        $httpProvider.defaults.withCredentials = true;

        // Set markdown options.
        markedProvider.setOptions({
            gfm: true,
            tables: true,
            breaks: true
        });
    });

    /*
     * Loading components.
     */
    load(dlTools);

    /*
     * Running the app.
     */
    /* @ngInject */
    dlTools.run(function ($rootScope, $state, $stateParams, $injector, Auth, DataServicesManager) {

        var jiraDataService = $injector.get('JiraDataService');
        DataServicesManager.register(jiraDataService);
        var fecruDataService = $injector.get('FecruDataService');
        DataServicesManager.register(fecruDataService);
        var gitlabDataService = $injector.get('GitlabDataService');
        DataServicesManager.register(gitlabDataService);

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        // todo: implement user model. Save to to session storage (?).
        //$rootScope.user = null;

        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                if (!Auth.isLoggedIn()) {
                    var guestAccessAllowed = toState.data && toState.data.guestAccess;
                    if (!guestAccessAllowed) {
                        event.preventDefault();
                        $state.go('login');
                    }
                }
            }
        );
    });
});