define([], function() {
    /* @ngInject */
    function gitlabApiClientFactory($resource, API_BASE_URL) {
        function url(path) {
            return API_BASE_URL + '/proxy/gitlab' + path;
        }
        return {
            projects() {
                return $resource(url('/projects'), {}, {
                    query: { method:'GET', isArray: true, cache: true, cancellable: true }
                });
            },
            project() {
                return $resource(url('/projects/:project_id'), {});
            },
            projectCommits() {
                return $resource(url('/projects/:project_id/repository/commits'), {});
            },
            projectBranches() {
                return $resource(url('/projects/:project_id/repository/branches'), {}, {
                    query: { method:'GET', isArray: true, cache: true, cancellable: true }
                });
            },
            projectBranch() {
                return $resource(url('/projects/:project_id/repository/branches/:branch_name'), {});
            }
        };
    }

    return gitlabApiClientFactory;
});