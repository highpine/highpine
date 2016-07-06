define([], function() {
    /* @ngInject */
    function authController($scope, $rootScope, $location, Auth) {
        $scope.login = function() {
            Auth.login($scope.username, $scope.password).then(function(result) {
                $scope.errorMessage = null;
                $rootScope.$broadcast('login.success', result);
                $location.url('/profile');
            }, function(result) {
                console.log(result);
                $scope.errorMessage = result.message || 'Login failed';
                $rootScope.$broadcast('login.failed', result);
            });
        };
    }

    return authController;
});