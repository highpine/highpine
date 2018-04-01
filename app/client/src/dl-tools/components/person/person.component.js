define([
    'angular-ui-router',
    '@shared/jira'
], function() {
    /* @ngInject */
    function personController($scope) {
        // $scope.document.title = this.person.displayName;
        // $scope.person = person;
    }

    return {
        controller: personController,
        templateUrl: 'dl-tools/components/person/person.tpl.html',
        bindings: {
            person: '<'
        },
    };
});