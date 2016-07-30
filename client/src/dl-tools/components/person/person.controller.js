define([
    'angular-ui-router',
    'client-shared-jira'
], function() {
    /* @ngInject */
    function personController($scope, $stateParams, JiraDataService) {

        $scope.person = null;
        $scope.username = $stateParams.username;
        $scope.period = parseInt($stateParams.period) || 7;
        $scope.fromDate = getFromDate($scope.period);

        JiraDataService.getApiClient().user().get({
            username: $stateParams.username
        }, function(user) {
            $scope.person = user;
        });

        function getFromDate(periodInDays) {
            var periodStart = new Date();
            periodStart.setDate(periodStart.getDate() - periodInDays);
            return periodStart;
        }
    }

    return personController;
});