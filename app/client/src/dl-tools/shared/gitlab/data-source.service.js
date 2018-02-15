define([], function() {
    /* @ngInject */
    return function (HpDataSource, GitlabApiClient) {
        return new HpDataSource('gitlab', 'Gitlab', GitlabApiClient);
    };
});