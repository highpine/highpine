define([
    'angular-ui-router',
    './projects.controller'
], function(angularUiRouter, projectsController) {
    return function(module) {
        /* @ngInject */
        module.config(function($stateProvider) {
            $stateProvider
                .state('projects', {
                    url: '/projects',
                    templateUrl: 'dl-tools/components/projects/projects.tpl.html',
                    controller: 'ProjectsController',
                    data: {
                        documentTitle: 'Projects'
                    }
                });
        });

        module.controller('ProjectsController', projectsController);
    };
});