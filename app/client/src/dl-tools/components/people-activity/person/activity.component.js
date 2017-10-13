define([
    'angular-ui-router',
    '@shared/jira'
], function() {
    /* @ngInject */
    function personActivityController($scope, JiraDataService) {

        this.showJira = true;
        this.showFecru = true;
        this.showGit = false; // it is slow and produces tens of requests to gitlab API.

        this.period = parseInt(this.period) || 7;
        this.getFromDate = function(periodInDays) {
            let periodStart = new Date();
            periodStart.setHours(0, 0, 1);
            periodStart.setDate(periodStart.getDate() - periodInDays + 1);
            return periodStart;
        };

        this.fromDate = this.getFromDate(this.period);
    }

    return {
        templateUrl: 'dl-tools/components/people-activity/person/activity.tpl.html',
        controller: personActivityController,
        bindings: {
            person: '<'
        }
    };
});