define([
    '@shared/auth'
], function() {
    return {
        /* @ngInject */
        controller: function($scope, $rootScope, $state, Auth) {
            this.login = function() {
                Auth.login({
                    username: this.username,
                    password: this.password,
                    strategy: 'fecru-token'
                }).then(function(result) {
                    this.errorMessage = null;
                    $rootScope.$broadcast('login.success', result);
                    $state.go('dashboard');
                }, function(result) {
                    this.errorMessage = result.message || 'Login failed';
                    $rootScope.$broadcast('login.failed', result);
                });
            };
        },
        templateUrl: 'dl-tools/shared/fecru-alt-auth-token/fecru-alt-auth-token.tpl.html',
        bindings: {
            expand: '<'
        }
    };
});