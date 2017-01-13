require.config({
    paths: {
        'marked': '/vendor/marked/marked.min',
        'angular-marked': '/vendor/angular-marked/dist/angular-marked.min'
    },
    shim: {
        'angular-marked': ['angular', 'marked']
    }
});
define([
    'angular-ui-router',
    'marked',
    'angular-marked',
    'dl-tools/components/person/person.controller',
    'dl-tools/components/person/person-jira-comments.directive',
    'dl-tools/components/person/person-fecru-comments.directive',
    'dl-tools/components/person/person-git-commits.directive'
], function(
        angularUiRouter,
        marked,
        angularMarked,
        personController,
        personJiraCommentsDirective,
        personFecruCommentsDirective,
        personGitCommitsDirective
    ) {
        return {
            dependencies: [
                'hc.marked'
            ],
            init: function(module) {
                /* @ngInject */
                module.config(function($stateProvider, markedProvider) {
                    $stateProvider
                        .state('person', {
                            url: '/person/:username?period',
                            templateUrl: 'dl-tools/components/person/person.tpl.html',
                            controller: 'PersonController'
                        });

                    // Set markdown options.
                    markedProvider.setOptions({
                        gfm: true,
                        tables: true,
                        breaks: true
                    });
                });

                module.controller('PersonController', personController);
                module.directive('personJiraComments', personJiraCommentsDirective);
                module.directive('personFecruComments', personFecruCommentsDirective);
                module.directive('personGitCommits', personGitCommitsDirective);
            }
        };
});