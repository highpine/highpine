define([], function() {
    /* @ngInject */
    return function($scope, $state) {
        $scope.showPerson = function(jiraUser) {
            $state.go('person', {username: jiraUser.name, period: 7});
        };
    }
});