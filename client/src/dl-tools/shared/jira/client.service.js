define([], function() {
    /* @ngInject */
    function jiraApiClientFactory($resource) {
        return {
            session: function() {
                return $resource('/api/proxy/jira/session', {});
            },
            myself: function() {
                return $resource('/api/proxy/jira/myself', {});
            },
            user: function() {
                return $resource('/api/proxy/jira/user', {});
            },
            userPicker: function() {
                return $resource('/api/proxy/jira/user/picker', {cancellable: true});
            },
            search: function() {
                return $resource('/api/proxy/jira/search', {});
            }
        };
    }

    return jiraApiClientFactory;
});