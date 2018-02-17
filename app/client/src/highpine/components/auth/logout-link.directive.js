define([], function() {
    /* @ngInject */
    function logoutLinkDirective() {
        return {
            /* @ngInject */
            controller: function($scope, $rootScope, $state, Auth) {
                $scope.Auth = Auth;
                $scope.logout = function() {
                    Auth.logout().then(function() {
                        $rootScope.$broadcast('logout');
                        $state.go('login');
                    });
                };
            },
            template: '<button type="button" class="btn btn-default navbar-btn" ' +
                'data-ng-if="Auth.isLoggedIn()" data-ng-click="logout()">Logout</button>'
        };
    }

    return logoutLinkDirective;
});