define([
    'client-shared-auth'
], function() {
    /* @ngInject */
    function jiraAltAuthCookiesDirective() {
        return {
            scope: {},
            /* @ngInject */
            controller: function($scope, $rootScope, $location, Auth) {
                $scope.login = function() {
                    Auth.login({
                        username: $scope.username,
                        password: $scope.password,
                        strategy: 'jira-cookies'
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
            },
            templateUrl: 'dl-tools/shared/jira-alt-auth-cookies/jira-alt-auth-cookies.tpl.html'
        };
    }

    return jiraAltAuthCookiesDirective;
});