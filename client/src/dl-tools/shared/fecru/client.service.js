define([], function() {
    /* @ngInject */
    function fecruApiClientFactory($resource) {
        return {
            reviews: function() {
                return $resource('/api/fecru/proxy/reviews', {});
            }
        };
    }

    return fecruApiClientFactory;
});