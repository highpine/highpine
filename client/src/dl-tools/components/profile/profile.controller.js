define([
    'client-shared-jira'
], function() {
    /* @ngInject */
    function profileController($scope, JiraDataService) {
        $scope.user = {};
        JiraDataService.getApiClient().myself().get({}, function(user) {
            $scope.user = user;
        });
    }

    return profileController;
});