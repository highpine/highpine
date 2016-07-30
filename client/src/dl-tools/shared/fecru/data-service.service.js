define([
    'angular'
], function(angular) {
    /* @ngInject */
    return function (AbstractDataService, FecruApiClient) {
        return angular.extend({}, AbstractDataService, {
            getName: function() {
                return 'Fecru';
            },
            getKey: function() {
                return 'fecru';
            },
            getApiClient: function() {
                return FecruApiClient;
            }
        });
    };
});