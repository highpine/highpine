define([], function() {
    /* @ngInject */
    function gitlabApiClientFactory($resource) {
        return {
            projects: function() {
                return $resource('/api/proxy/gitlab/projects', {});
            },
            projectCommits: function() {
                return $resource('/api/proxy/gitlab/projects/:project_id/repository/commits', {});
            }
        };
    }

    return gitlabApiClientFactory;
});