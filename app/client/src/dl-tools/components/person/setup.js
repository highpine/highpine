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
                                person: (JiraDataService, $stateParams) => {
                                    // todo: change to retrieving the person from internal database
                                    return JiraDataService.getApiClient().user().get({
                                        username: $stateParams.username
                                    });
                                }
                            },
                            data: {
                                documentTitle: 'Person'
                            }
                        })
                        .state('person.overview', {
                            url: ''
                        })
                        .state('person.activity', {
                            url: '/activity',
                            component: 'personActivity',
                            data: {
                                documentTitle: 'Person'
                            }
                        });
                });

                module.component('personComponent', personComponent);
            }
        };
});