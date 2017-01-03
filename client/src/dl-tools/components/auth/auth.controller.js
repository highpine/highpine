define([
    'angular-ui-router',
    'client-shared-auth'
], function() {
    /* @ngInject */
    function authController($scope, $rootScope, $location, Auth) {
        $scope.login = function() {
            Auth.login({
                username: $scope.username,
                password: $scope.password
            }).then(function(result) {
                $scope.errorMessage = null;
                $rootScope.$broadcast('login.success', result);
                $location.path('/');
            }, function(result) {
                console.log(result);
                $scope.errorMessage = result.message || 'Login failed';
                $rootScope.$broadcast('login.failed', result);
            });
        };
    }

    return authController;
});