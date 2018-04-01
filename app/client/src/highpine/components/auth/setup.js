define([
    './auth.controller',
    './logout-link.directive',
    'angular-ui-router',
    '@shared/alt-auth'
], function(authController, logoutLinkDirective) {
    return {
        init: function(module) {
            /* @ngInject */
            module.config(function($stateProvider) {
                $stateProvider
                    .state('login', {
                        url: '/login',
                        templateUrl: 'highpine/components/auth/login.tpl.html',
                        controller: 'HpAuthController',
                        data: {
                            documentTitle: 'Sign in',
                            guestAccess: true
                        }
                    });
            });

            module.controller('HpAuthController', authController);
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