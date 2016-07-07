define([
    'angular-ui-router',
    'client-shared-auth'
], function() {
    /* @ngInject */
    function authController($scope, $rootScope, $state, Auth) {
        $scope.login = function() {
            Auth.login($scope.username, $scope.password).then(function(result) {
                $scope.errorMessage = null;
                $rootScope.$broadcast('login.success', result);
                $state.go('profile');
            }, function(result) {
                console.log(result);
                $scope.errorMessage = result.message || 'Login failed';
                $rootScope.$broadcast('login.failed', result);
            });
        };
    }

    return authController;
});