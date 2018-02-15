define([
    'angular-ui-router',
    'dl-tools/components/person/person.component',
], function(
        angularUiRouter,
        personComponent
    ) {
        return {
            init(module) {
                /* @ngInject */
                module.config(function($stateProvider) {
                    $stateProvider
                        .state('person', {
                            url: '/person/:username',
                            component: 'personComponent',
                            resolve: {
                                person: (JiraDataSource, $stateParams) => {
                                    // todo: change to retrieving the person from internal database
                                    return JiraDataSource.getApiClient().user().get({
                                        username: $stateParams.username
                                    });
                                }
                            },
                            data: {
                                documentTitle: 'Person'
                            }
                        })
                        .state('person.overview', {
                            // todo: add a real person overview component
                            url: '/overview',
                            template: '<div class="card"><div class="card-body">' +
                                '{{ $ctrl.person.displayName }} is a good person first of all.</div></div>',
                            data: {
                                documentTitle: 'Person Overview'
                            }
                        })
                        .state('person.activity', {
                            url: '/activity',
                            component: 'personActivity',
                            data: {
                                documentTitle: 'Person Activity'
                            }
                        });
                });

                module.component('personComponent', personComponent);
            }
        };
});