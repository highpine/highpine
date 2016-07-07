define([
    'client-shared-jira'
], function() {
    /* @ngInject */
    function profileController($scope, JiraApiClient) {
        $scope.user = {};
        JiraApiClient.myself().get({}, function(user) {
            $scope.user = user;
        });
    }

    return profileController;
});