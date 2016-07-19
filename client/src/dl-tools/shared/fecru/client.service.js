define([], function() {
    /* @ngInject */
    function fecruApiClientFactory($resource) {
        return {
            reviews: function() {
                return $resource('/api/proxy/fecru/rest-service/reviews-v1/filter/details', {});
            }
        };
    }

    return fecruApiClientFactory;
});