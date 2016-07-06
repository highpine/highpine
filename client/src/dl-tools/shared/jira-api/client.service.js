define([], function() {
    /* @ngInject */
    function JiraApiClientFactory($resource) {
        return {
            session: function() {
                return $resource('/api/jira/proxy/session', {});
            },
            myself: function() {
                return $resource('/api/jira/proxy/myself', {});
            }
        };
    }

    return JiraApiClientFactory;
});