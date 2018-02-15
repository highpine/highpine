define([], function() {
    /* @ngInject */
    return function (HpDataSource, JiraApiClient) {
        return new HpDataSource('jira', 'Jira', JiraApiClient);
    };
});