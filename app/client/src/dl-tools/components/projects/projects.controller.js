define([], function() {
    /* @ngInject */
    function controller($scope, JiraDataSource) {

        JiraDataSource.getApiClient().projects().query({}, function(projects) {
            $scope.projects = projects;
        });
    }

    return controller;
});