define([], function() {
    /* @ngInject */
    function profileController($scope, $location, Auth, JiraApiClient) {
        $scope.user = {};
        JiraApiClient.session().get({}, function(info) {
            $scope.user = info;
        });

        $scope.isLoggedIn = Auth.isLoggedIn();

        $scope.logout = function() {
            Auth.logout().then(function() {
                $location.url('/');
            });
        };

        //$timeout(function() {
        //    Auth.verify();
        //}, 1000);
    }

    return profileController;
});