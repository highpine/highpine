define([], function() {
    /* @ngInject */
    function profileController($scope, $location, Auth, JiraApiClient) {
        $scope.user = {};
        JiraApiClient.myself().get({}, function(user) {
            $scope.user = user;
        });


    }

    return profileController;
});