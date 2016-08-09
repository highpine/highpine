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
            },
            projects: function() {
                return $resource('/api/proxy/jira/project', {}, {
                    query: {method:'GET', isArray:true, cache: true}
                });
            },
            project: function() {
                return $resource('/api/proxy/jira/project/:key', {}, {
                    get: {method:'GET', cache: true}
                });
            }
        };
    }

    return jiraApiClientFactory;
});