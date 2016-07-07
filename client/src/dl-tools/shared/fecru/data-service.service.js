define([
    'angular'
], function(angular) {
    /* @ngInject */
    return function (AbstractDataService) {
        return angular.extend({}, AbstractDataService, {
            getName: function() {
                return 'Fecru';
            },
            getKey: function() {
                return 'fecru';
            }
        });
    };
});