define([], function() {
    /* @ngInject */
    function managerFactory() {
        /**
         * Data services registry.
         * @type {object}
         */
        var registry = {};

        return {
            /**
             * Register data service.
             * @param {string} name
             * @param {object} service
             */
            register: function(name, service) {
                if (registry[name]) {
                    throw new Error('Data Service with name "' + name + '" is already registered.');
                }
                registry[name] = service;
            },
            getServices: function() {
                return registry;
            },
            getService: function(name) {
                return registry[name] || null;
            }
        };
    }

    return managerFactory;
});