define([], function() {
    /* @ngInject */
    function peopleApiFactory($resource, API_BASE_URL) {
        return $resource(API_BASE_URL + '/people', {}, {
            query: { method: 'GET', isArray: true, cache: true }
        });
    }

    return peopleApiFactory;
});