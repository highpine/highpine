define([], function() {
    /* @ngInject */
    return function (HpDataSource, FecruApiClient, UserStorage) {
        return new HpDataSource('fecru', 'Fecru', FecruApiClient, UserStorage, 'fecru-auth-token');
    };
});