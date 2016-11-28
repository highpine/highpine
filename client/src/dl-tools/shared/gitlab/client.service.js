define([], function() {
    /* @ngInject */
    function gitlabApiClientFactory($resource, API_BASE_URL) {
        function url(path) {
            return API_BASE_URL + '/proxy/gitlab' + path;
        }
        return {
            projects: function() {
                return $resource(url('/projects'), {});
            },
            projectCommits: function() {
                return $resource(url('/projects/:project_id/repository/commits'), {});
            }
        };
    }

    return gitlabApiClientFactory;
});