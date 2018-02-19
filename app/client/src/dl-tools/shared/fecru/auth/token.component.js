define([
    '@shared/auth'
], function() {
    return {
        /* @ngInject */
        controller: function($scope, $rootScope, $state, Auth, HpModal) {
            const $ctrl = this;
            this.login = function() {
                Auth.login({
                    username: this.username,
                    password: this.password,
                    strategy: 'fecru-token'
                }).then(function(result) {
                    $ctrl.errorMessage = null;
                    $rootScope.$broadcast('login.success', result);
                    HpModal.close(); // close modals if any.
                    if ($state.is('login')) {
                        $state.go('dashboard');
                    }
                }, function(result) {
                    $ctrl.errorMessage = result.message || 'Login failed';
                    $rootScope.$broadcast('login.failed', result);
                });
            };
        },
        templateUrl: 'dl-tools/shared/fecru/auth/token.tpl.html',
        bindings: {
            expand: '<'
        }
    };
});