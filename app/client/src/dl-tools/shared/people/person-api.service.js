define([], function() {
    /* @ngInject */
    function personApiFactory($resource, API_BASE_URL) {
        return $resource(API_BASE_URL + '/people/:id', {}, {
            get: { method:'GET', cache: true }
        });
    }

    return personApiFactory;
});