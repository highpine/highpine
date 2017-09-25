define([
    'angular'
], function(angular) {
    /* @ngInject */
    return function (AbstractDataService, GitlabApiClient) {
        return angular.extend({}, AbstractDataService, {
            getName: function() {
                return 'Gitlab';
            },
            getKey: function() {
                return 'gitlab';
            },
            getApiClient: function() {
                return GitlabApiClient;
            }
        });
    };
});