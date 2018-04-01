define([
    'angular-ui-router',
    './project.controller'
], function(angularUiRouter, projectController) {
    return function(module) {
        /* @ngInject */
        module.config(function($stateProvider) {
            $stateProvider
                .state('project', {
                    url: '/project/:key',
                    templateUrl: 'dl-tools/components/project/project.tpl.html',
                    controller: 'ProjectController',
                    data: {
                        documentTitle: 'Project'
                    }
                });
        });

        module.controller('ProjectController', projectController);
    };
});