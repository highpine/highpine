define([], function() {
    /* @ngInject */
    function authController($scope, $location, Auth) {
        $scope.login = function() {
            Auth.login($scope.username, $scope.password).then(function(result) {
                $scope.errorMessage = null;
                $location.url('/profile');
            }, function(result) {
                console.log(result);
                $scope.errorMessage = result.message || 'Login failed';
            });
        }
    }

    return authController;
});