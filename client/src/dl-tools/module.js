define([
    'angular',
    'angular-route',
    'angular-resource',
    'angular-ui-router',
    'ngstorage',
    'angular-marked',
    'marked',

    'dl-tools/load',
    'dl-tools/templates',
    'dl-tools/vendor-templates'
], function(
    angular, ngRoute, angularResource, angularUiRouter, ngStorage, angularMarked, marked,

    load, templates, vendoerTemplates
) {
    var dlTools = angular.module('DlTools', [
        'ngRoute',
        'ngResource',
        'ngStorage',
        'ui.router',
        'hc.marked',
        'dl-tools-templates',
        'dl-tools-vendor-templates'
    ]);

    load(dlTools);

    /* @ngInject */
    dlTools.config(function (markedProvider) {
        markedProvider.setOptions({
            gfm: true,
            tables: true,
            breaks: true
        });
    });

    /* @ngInject */
    dlTools.run(function ($rootScope, $state, $stateParams, $injector, Auth, DataServicesManager) {

        var jiraDataService = $injector.get('JiraDataService');
        DataServicesManager.register(jiraDataService);
        var fecruDataService = $injector.get('FecruDataService');
        DataServicesManager.register(fecruDataService);
        // todo: remove, for testing only
        var AbstractDataService = $injector.get('AbstractDataService');
        DataServicesManager.register(angular.extend({}, AbstractDataService, {
            getName: function() {
                return 'Bad Service';
            },
            getKey: function() {
                return 'badService';
            }
        }));


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