define([
    'angular-ui-router',
    './project.controller'
], function(angularUiRouter, projectController) {
    return function(module) {
        /* @ngInject */
        module.config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('project', {
                    url: '/project/:key',
                    templateUrl: 'components/project/project.tpl.html',
                    controller: 'ProjectController'
                });
        });

        module.controller('ProjectController', projectController);
    };
});