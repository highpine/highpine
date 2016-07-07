define([], function() {
    /* @ngInject */
    function jiraApiClientFactory($resource) {
        return {
            session: function() {
                return $resource('/api/jira/proxy/session', {});
            },
            myself: function() {
                return $resource('/api/jira/proxy/myself', {});
            },
            user: function() {
                return $resource('/api/jira/proxy/user', {});
            },
            search: function() {
                return $resource('/api/jira/proxy/search', {});
            }
        };
    }

    return jiraApiClientFactory;
});