define([
    'angular-ui-router',
    'dl-tools/components/people/people.component'
], function(angularUiRouter, peopleComponent) {
        return {
            init(module) {
                /* @ngInject */
                module.config(function($stateProvider) {
                    $stateProvider
                        .state('people', {
                            url: '/people',
                            component: 'peopleComponent',
                            resolve: {
                                people: (PeopleApi) => {
                                    return PeopleApi.query({});
                                }
                            },
                            data: {
                                documentTitle: 'People'
                            }
                        });
                });

                module.component('peopleComponent', peopleComponent);
            }
        };
});