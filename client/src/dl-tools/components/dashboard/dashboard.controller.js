define([], function() {
    /* @ngInject */
    function dashboardController($scope, $state) {
        $scope.showPerson = function(jiraUser) {
            $state.go('person', {username: jiraUser.name});
        };
    }

    return dashboardController;
});