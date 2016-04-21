define([
    'angular',
    'angularRoute',
    'angularResource',
    'dl-tools/routes',
    'dl-tools/templates',
    'dl-tools/components/auth/auth.controller',
    'dl-tools/components/profile/profile.controller',
    'dl-tools/shared/auth/auth.service',
    'dl-tools/shared/jira-api/client.service'
], function(
    angular, ngRoute, angularResource, routes, templates,

    authController, profileController,

    authService, jiraApiClient
) {
    var dlTools = angular.module('DlTools', ['ngRoute', 'ngResource', 'dl-tools-templates']);

    dlTools.config(routes);

    dlTools.controller('AuthController', authController);
    dlTools.controller('ProfileController', profileController);
    dlTools.controller('RootController', function($rootScope) {
        console.log($rootScope);
    });

    dlTools.factory('Auth', authService);
    dlTools.factory('JiraApiClient', jiraApiClient);
});