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
            controller: function($scope, $timeout, $sce, GitlabDataSource) {

                const minSearchTermLength = $scope.minSearchTermLength || 1;
                const searchRunTimeout = 150;

                let searchPromise, searchRequest;

                function startSearch() {
                    $scope.projects = [];
                    $scope.searchInProgress = true;
                }
                function finishSearch(result) {
                    $scope.projects = result || [];
                    $scope.searchInProgress = false;
                }

                $scope.search = function(searchTerm) {
                    if (searchPromise) {
                        $timeout.cancel(searchPromise);
                    }
                    if (searchRequest && searchRequest.$cancelRequest) {
                        searchRequest.$cancelRequest();
                    }
                    if (!searchTerm || searchTerm.length < minSearchTermLength) {
                        finishSearch();
                        return;
                    }
                    searchPromise = $timeout(function() {
                        startSearch();
                        searchPromise = null;
                        searchRequest = GitlabDataSource.getApiClient().projects()
                            .query({ search: searchTerm }, function(result) {
                                finishSearch(result);
                            });
                    }, searchRunTimeout);
                };

            },
            templateUrl: 'dl-tools/shared/gitlab-project-finder/finder.tpl.html'
        };
    }

    return directive;
});