/**
 * Data services registry.
 * @type {object}
 */
var registry = {};

var dataServicesManager = {

    /**
     * Register data service.
     * @param {{getKey: function}} service
     */
    register: function(service) {
        var key = service.getKey();
        if (registry[key]) {
            throw new Error('Data Service with name "' + key + '" is already registered.');
        }
        registry[key] = service;
    },

    /**
     * Get registered services as array.
     * @returns {Array}
     */
    getServices: function() {
        return Object.keys(registry).map(function(key) { return registry[key]; });
    },

    /**
     * Get registered data service by key.
     * @param {string} key
     * @returns {Object|null}
     */
    getService: function(key) {
        return registry[key] || null;
    }
};

module.exports = dataServicesManager;