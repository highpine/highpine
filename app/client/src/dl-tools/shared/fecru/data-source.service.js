define([], function() {
    /* @ngInject */
    return function (HpDataSource, FecruApiClient) {
        return new HpDataSource('fecru', 'Fecru', FecruApiClient);
    };
});