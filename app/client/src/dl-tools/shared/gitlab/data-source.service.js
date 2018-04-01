define([], function() {
    /* @ngInject */
    return function (HpDataSource, GitlabApiClient, UserStorage) {
        return new HpDataSource('gitlab', 'Gitlab', GitlabApiClient, UserStorage, 'gitlab-auth-oauth');
    };
});