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
    './people/activity.controller',
    './person/activity.component',
    './person/person-jira-comments.directive',
    './person/person-fecru-comments.directive',
    './person/person-git-commits.directive'
], function(
    angularUiRouter,
    marked,
    angularMarked,
    peopleActivityController,
    personActivityComponent,
    personJiraCommentsDirective,
    personFecruCommentsDirective,
    personGitCommitsDirective
) {
    return {
        dependencies: [
            'hc.marked'
        ],
        init(module) {
            /* @ngInject */
            module.config(function($stateProvider, markedProvider) {
                $stateProvider
                    .state('people-activity', {
                        url: '/people-activity',
                        templateUrl: 'dl-tools/components/people-activity/people/activity.tpl.html',
                        controller: 'PeopleActivityController',
                        data: {
                            documentTitle: 'People Activity'
                        }
                    });

                // Set markdown options.
                markedProvider.setOptions({
                    gfm: true,
                    tables: true,
                    breaks: true
                });
            });

            module.controller('PeopleActivityController', peopleActivityController);
            module.component('personActivity', personActivityComponent);
            module.directive('personJiraComments', personJiraCommentsDirective);
            module.directive('personFecruComments', personFecruCommentsDirective);
            module.directive('personGitCommits', personGitCommitsDirective);
        }
    };
});