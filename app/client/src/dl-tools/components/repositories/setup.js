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
                    }
                });
        });

        module.controller('RepositoriesController', repositoriesController);
    };
});