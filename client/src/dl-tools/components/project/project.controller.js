define([], function() {
    /* @ngInject */
    function controller($scope, $stateParams, JiraDataService) {
        var projectKey = $stateParams.key;
        JiraDataService.getApiClient().project()
            .get({key: projectKey}, function (project) {
                $scope.project = project;
            });
    }

    return controller;
});