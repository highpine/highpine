define([], function() {
    /* @ngInject */
    function controller($scope, JiraDataService) {

        JiraDataService.getApiClient().projects().query({}, function(projects) {
            $scope.projects = projects;
        });
    }

    return controller;
});