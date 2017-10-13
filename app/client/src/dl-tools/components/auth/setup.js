define([
    'angular-ui-router',
    '@shared/alt-auth',
    'dl-tools/components/auth/auth.controller',
    'dl-tools/components/auth/logout-link.directive'
], function(angularUiRouter, altAuth, authController, logoutLinkDirective) {
    return {
        init: function(module) {
            /* @ngInject */
            module.config(function($stateProvider) {
                $stateProvider
                    .state('login', {
                        url: '/login',
                        templateUrl: 'dl-tools/components/auth/login.tpl.html',
                        controller: 'AuthController',
                        data: {
                            documentTitle: 'Sign in',
                            guestAccess: true
                        }
                    });
            });

            module.controller('AuthController', authController);
            module.directive('logoutLink', logoutLinkDirective);
        },
        run: function(module, $injector) {
            let Auth = $injector.get('Auth');
            let $transitions = $injector.get('$transitions');
            $transitions.onStart({}, transition => {
                let toState = transition.to();
                let guestAccessAllowed = toState.data && toState.data.guestAccess;
                Auth.verify().then((res) => res, function() {
                    if (guestAccessAllowed) {
                        return;
                    }
                    transition.router.stateService.target('login');
                });
            });
        }
    };
});