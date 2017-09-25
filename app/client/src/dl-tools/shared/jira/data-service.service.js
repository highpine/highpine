define([
    'angular'
], function(angular) {
    /* @ngInject */
    return function (AbstractDataService, JiraApiClient) {
        return angular.extend({}, AbstractDataService, {
            getName: function() {
                return 'Jira';
            },
            getKey: function() {
                return 'jira';
            },
            getApiClient: function() {
                return JiraApiClient;
            }
        });
    };
});