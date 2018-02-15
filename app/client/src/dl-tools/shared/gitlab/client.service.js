define([], function() {

    class GitlabApiClient {
        /**
         * @param {String} baseUrl Base API URL.
         * @param {Function} $resource Angular ngResource.$resource service factory.
         */
        constructor(baseUrl, $resource) {
            this.baseUrl = baseUrl;
            this.$resource = $resource;
        }
        url(path) {
            return this.baseUrl + '/proxy/gitlab' + path;
        }
        projects() {
            return this.$resource(this.url('/projects'), {}, {
                query: { method:'GET', isArray: true, cache: true, cancellable: true }
            });
        }
        project() {
            return this.$resource(this.url('/projects/:project_id'), {});
        }
        projectCommits() {
            return this.$resource(this.url('/projects/:project_id/repository/commits'), {});
        }
        projectBranches() {
            return this.$resource(this.url('/projects/:project_id/repository/branches'), {}, {
                query: { method:'GET', isArray: true, cache: true, cancellable: true }
            });
        }
        projectBranch() {
            return this.$resource(this.url('/projects/:project_id/repository/branches/:branch_name'), {});
        }
    }

    /* @ngInject */
    return function($resource, API_BASE_URL) {
        return new GitlabApiClient(API_BASE_URL, $resource);
    };
});