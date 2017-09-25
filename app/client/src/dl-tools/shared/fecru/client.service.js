define([], function() {
    /* @ngInject */
    function fecruApiClientFactory($resource, API_BASE_URL) {
        function url(path) {
            return API_BASE_URL + '/proxy/fecru' + path;
        }
        return {
            reviews: function() {
                return $resource(url('/rest-service/reviews-v1/filter/details'), {});
            }
        };
    }

    return fecruApiClientFactory;
});