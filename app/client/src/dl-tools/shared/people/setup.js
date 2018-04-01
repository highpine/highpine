define([
    './people-api.service',
    './person-api.service',
], function(PeopleResourceFactory, PersonResourceFactory) {
    return {
        init: function(module) {
            module.factory('PeopleApi', PeopleResourceFactory);
            module.factory('PersonApi', PersonResourceFactory);
        }
    };
});