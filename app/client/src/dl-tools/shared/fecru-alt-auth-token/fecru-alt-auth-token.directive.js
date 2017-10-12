define([
    '@shared/auth'
], function() {
    /* @ngInject */
    function fecruAltAuthTokenDirective() {
        return {
            scope: {},
            /* @ngInject */
            controller: function($scope, $rootScope, $location, Auth) {
                $scope.login = function() {
                    Auth.login({
                        username: $scope.username,
                        password: $scope.password,
                        strategy: 'fecru-token'
                    }).then(function(result) {
                        $scope.errorMessage = null;
                        $rootScope.$broadcast('login.success', result);
                        $location.path('/');
                    }, function(result) {
                        $scope.errorMessage = result.message || 'Login failed';
                        $rootScope.$broadcast('login.failed', result);
                    });
                };
            },
            templateUrl: 'dl-tools/shared/fecru-alt-auth-token/fecru-alt-auth-token.tpl.html'
        };
    }

    return fecruAltAuthTokenDirective;
});