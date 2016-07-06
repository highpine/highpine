define([
    'angular',
    'dl-tools/shared/data-services-manager/setup'
], function(angular) {
    /* @ngInject */
    return function (AbstractDataService) {
        return angular.extend({}, AbstractDataService, {
            getName: function() {
                return 'Jira';
            },
            getKey: function() {
                return 'jira';
            }
        });
    };
});