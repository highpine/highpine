define([], function() {
    return {
        /* @ngInject */
        controller($scope, PeopleApi) {
            let ctlr = this;
            $scope.$on('people-changed', function () {
                return PeopleApi.query({}, people => {
                    ctlr.people = people;
                });
            });
        },
        templateUrl: 'dl-tools/components/people/people.tpl.html',
        bindings: {
            people: '<'
        },
    };
});