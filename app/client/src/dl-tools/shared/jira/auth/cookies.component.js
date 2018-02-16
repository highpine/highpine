define([
    '@shared/auth'
], function() {
    return {
        /* @ngInject */
        controller: function($rootScope, $location, Auth) {
            this.login = function() {
                Auth.login({
                    username: this.username,
                    password: this.password,
                    strategy: 'jira-cookies'
                }).then(function(result) {
                    this.errorMessage = null;
                    $rootScope.$broadcast('login.success', result);
                    $location.path('/');
                }, function(result) {
                    console.log(result);
                    this.errorMessage = result.message || 'Login failed';
                    $rootScope.$broadcast('login.failed', result);
                });
            };
        },
        templateUrl: 'dl-tools/shared/jira/auth/cookies.tpl.html',
        bindings: {
            expand: '<'
        }
    };
});