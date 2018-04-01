define([], function() {
    /* @ngInject */
    function jiraApiClientFactory($resource, API_BASE_URL) {
        function url(path) {
            return API_BASE_URL + '/proxy/jira' + path;
        }
        return {
            session: function() {
                return $resource(url('/session'), {});
            },
            myself: function() {
                return $resource(url('/myself'), {});
            },
            user: function() {
                return $resource(url('/user'), {});
            },
            userPicker: function() {
                return $resource(url('/user/picker'), {cancellable: true});
            },
            search: function() {
                return $resource(url('/search'), {});
            },
            projects: function() {
                return $resource(url('/project'), {}, {
                    query: { method:'GET', isArray:true, cache: true }
                });
            },
            project: function() {
                return $resource(url('/project/:key'), {}, {
                    get: { method:'GET', cache: true }
                });
            }
        };
    }

    return jiraApiClientFactory;
});