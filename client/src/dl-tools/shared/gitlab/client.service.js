define([], function() {
    /* @ngInject */
    function gitlabApiClientFactory($resource) {
        return {
            projects: function() {
                return $resource('/api/proxy/gitlab/projects', {});
            }
        };
    }

    return gitlabApiClientFactory;
});