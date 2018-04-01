define([
    'angular-ui-router',
    './repos.controller'
], function(angularUiRouter, repositoriesController) {
    return function(module) {
        /* @ngInject */
        module.config(function($stateProvider) {
            $stateProvider
                .state('repositories', {
                    url: '/repositories',
                    templateUrl: 'dl-tools/components/repositories/repos.tpl.html',
                    controller: 'RepositoriesController',
                    data: {
                        documentTitle: 'Repositories'
                    },
                    resolve: {
                        /* @ngInject */
                        gitlabApiClient: ($q, $rootScope, $state, $transition$, $timeout, GitlabDataSource) => {
                            let deferred = $q.defer();

                                $timeout(function() {
                                    if (!GitlabDataSource.isAuthorized) {
                                        const returnTo = $state.href($transition$.$to(), {}, {absolute: true});
                                        $rootScope.$broadcast('data-source.auth-request', GitlabDataSource, returnTo);
                                        deferred.reject(GitlabDataSource.apiClient);
                                    }
                                    deferred.resolve(GitlabDataSource.apiClient);
                                }, 0);

                            return deferred.promise;
                        }
                    }
                });
        });

        module.controller('RepositoriesController', repositoriesController);
    };
});