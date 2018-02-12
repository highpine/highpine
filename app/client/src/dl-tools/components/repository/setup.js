define([
    'angular-ui-router',
    './repo.controller'
], function(angularUiRouter, repositoryController) {
    return function(module) {
        /* @ngInject */
        module.config(function($stateProvider) {
            $stateProvider
                .state('repository', {
                    url: '/repository/:namespace/:name',
                    templateUrl: 'dl-tools/components/repository/repo.tpl.html',
                    controller: 'RepositoryController',
                    data: {
                        documentTitle: 'Repository'
                    }
                });
        });

        module.controller('RepositoryController', repositoryController);
    };
});