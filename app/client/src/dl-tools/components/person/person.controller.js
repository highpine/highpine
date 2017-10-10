define([
    'angular-ui-router',
    'client-shared-jira'
], function() {
    /* @ngInject */
    function personController($scope, $transition$, $state, JiraDataService) {

        let stateParams = $transition$.params();
        $scope.showJira = true;
        $scope.showFecru = true;
        $scope.showGit = false; // it is slow and produces tens of requests to gitlab API.

        $scope.person = null;
        $scope.username = stateParams.username;
        $scope.period = parseInt(stateParams.period) || 0;
        if (!$scope.period) {
            $state.go('person', {username: stateParams.username, period: 1});
        }
        $scope.fromDate = getFromDate($scope.period);

        JiraDataService.getApiClient().user().get({
            username: stateParams.username
        }, function(user) {
            $scope.person = user;
            $scope.document.title = user.displayName;
        });

        function getFromDate(periodInDays) {
            var periodStart = new Date();
            periodStart.setHours(0, 0, 1);
            periodStart.setDate(periodStart.getDate() - periodInDays + 1);
            return periodStart;
        }
    }

    return personController;
});