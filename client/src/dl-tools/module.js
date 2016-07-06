define([
    'angular',
    'angularRoute',
    'angularResource',
    'angularUiRouter',
    'ngStorage',

    'dl-tools/load',
    'dl-tools/templates'
], function(
    angular, ngRoute, angularResource, angularUiRouter, ngStorage,

    load, templates
) {
    var dlTools = angular.module('DlTools', [
        'ngRoute',
        'ngResource',
        'ngStorage',
        'ui.router',
        'dl-tools-templates'
    ]);

    load(dlTools);

    /* @ngInject */
    dlTools.run(function ($rootScope, $state, $stateParams, $injector, Auth, DataServicesManager) {

        var jiraDataService = $injector.get('JiraDataService');
        DataServicesManager.register(jiraDataService.getKey(), jiraDataService);

        // todo: remove, for testing only
        var AbstractDataService = $injector.get('AbstractDataService');
        DataServicesManager.register('badService', angular.extend({}, AbstractDataService, {
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