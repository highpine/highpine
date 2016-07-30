define([
    'angular-ui-router',
    'dl-tools/components/auth/auth.controller'
], function(angularUiRouter, authController) {
    return function(module) {
        /* @ngInject */
        module.config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'components/auth/login.tpl.html',
                    controller: 'AuthController',
                    data: {
                        guestAccess: true
                    }
                });
        });

        module.controller('AuthController', authController);
    };
});