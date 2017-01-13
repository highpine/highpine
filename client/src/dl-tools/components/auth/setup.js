define([
    'angular-ui-router',
    'client-shared-alt-auth',
    'dl-tools/components/auth/auth.controller',
    'dl-tools/components/auth/logout-link.directive'
], function(angularUiRouter, altAuth, authController, logoutLinkDirective) {
    return {
        init: function(module) {
            /* @ngInject */
            module.config(function($stateProvider, $urlRouterProvider) {
                $stateProvider
                    .state('login', {
                        url: '/login',
                        templateUrl: 'dl-tools/components/auth/login.tpl.html',
                        controller: 'AuthController',
                        data: {
                            guestAccess: true
                        }
                    });
            });

            module.controller('AuthController', authController);
            module.directive('logoutLink', logoutLinkDirective);
        },
        run: function(module, $injector) {
            let Auth = $injector.get('Auth');
            let $rootScope = $injector.get('$rootScope');
            let $state = $rootScope.$state;
            $rootScope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams) {
                    let guestAccessAllowed = toState.data && toState.data.guestAccess;
                    Auth.verify().then((res) => res, function() {
                        if (guestAccessAllowed) {
                            return;
                        }
                        $state.go('login');
                    });
                }
            );
        }
    };
});