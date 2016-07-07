define([
    'angular-ui-router',
    'dl-tools/components/person/person.controller',
    'dl-tools/components/person/person-jira-comments.directive',
    'dl-tools/components/person/person-fecru-comments.directive'
], function(angularUiRouter, personController, personJiraCommentsDirective, personFecruCommentsDirective) {
    return function(module) {
        /* @ngInject */
        module.config(function($stateProvider) {
            $stateProvider
                .state('person', {
                    url: '/person/:username?period',
                    templateUrl: 'components/person/person.tpl.html',
                    controller: 'PersonController'
                });
        });
        module.controller('PersonController', personController);
        module.directive('personJiraComments', personJiraCommentsDirective);
        module.directive('personFecruComments', personFecruCommentsDirective);
    };
});