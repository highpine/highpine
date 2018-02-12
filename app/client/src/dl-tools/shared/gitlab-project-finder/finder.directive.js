define([
    '@shared/gitlab'
], function() {
    /* @ngInject */
    function directive() {
        return {
            scope: {
                selectProject: '=callback',
                minSearchTermLength: '=?minLength'
            },
            /* @ngInject */
            controller: function($scope, $timeout, $sce, GitlabDataService) {

                $scope.projects = [];

                const minSearchTermLength = $scope.minSearchTermLength || 1;
                const searchRunTimeout = 150;

                let searchPromise, searchRequest;

                $scope.search = function(searchTerm) {
                    if (searchPromise) {
                        $timeout.cancel(searchPromise);
                    }
                    if (searchRequest && searchRequest.$cancelRequest) {
                        searchRequest.$cancelRequest();
                    }
                    if (!searchTerm || searchTerm.length < minSearchTermLength) {
                        $scope.projects = [];
                        return;
                    }
                    searchPromise = $timeout(function() {
                        searchPromise = null;
                        searchRequest = GitlabDataService.getApiClient().projects()
                            .query({ search: searchTerm }, function(result) {
                                $scope.projects = result || [];
                            });
                    }, searchRunTimeout);
                };

            },
            templateUrl: 'dl-tools/shared/gitlab-project-finder/finder.tpl.html'
        };
    }

    return directive;
});