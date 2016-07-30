define([
    'angular-ui-router',
    './dashboard.controller'
], function(angularUiRouter, dashboardController) {
    return function(module) {
        /* @ngInject */
        module.config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('dashboard', {
                    url: '/dashboard',
                    templateUrl: 'components/dashboard/dashboard.tpl.html',
                    controller: 'DashboardController'
                });

            $urlRouterProvider.otherwise("/dashboard");
        });

        module.controller('DashboardController', dashboardController);
    };
});