define([], function() {
    /* @ngInject */
    return function (HpDataSource, JiraApiClient, UserStorage) {
        return new HpDataSource('jira', 'Jira', JiraApiClient, UserStorage, 'jira-auth-oauth');
    };
});