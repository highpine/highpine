define([
    'dl-tools/components/auth/auth.controller'
], function(authController) {
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

            $urlRouterProvider.otherwise("/login");
        });


        module.controller('AuthController', authController);
    };
});