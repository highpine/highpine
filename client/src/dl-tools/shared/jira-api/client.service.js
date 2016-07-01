define([], function() {
    /* @ngInject */
    function jiraApiClientService($resource) {
        return {
            session: function() {
                return $resource('/api/jira/proxy/session', {}, {
                    authorize: {method: 'post', url: '/api/jira/session/authorize'}
                });
            }
        };
    }

    return jiraApiClientService;
});