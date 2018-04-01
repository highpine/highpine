define([], function() {
    /* @ngInject */
    return function() {
        /**
         * Auth methods registry.
         * @type {object}
         */
        let registry = {};

        return {
            /**
             * Register auth method.
             * @param {String} key
             * @param {String} authMethodComponent
             */
            register(key, authMethodComponent) {
                if (this.has(key)) {
                    throw new Error(`Auth Method with key "${key}" is already registered.`);
                }
                registry[key] = authMethodComponent;
            },
            /**
             * Get registered auth methods as an array.
             * @return {AuthMethod[]}
             */
            getAll() {
                return Object.keys(registry).map(key => registry[key]);
            },
            /**
             * Get auth method by its key.
             * @param {String} key
             * @return {AuthMethod|null}
             */
            get(key) {
                return registry[key] || null;
            },
            /**
             * Check if auth method with given key is already registered.
             * @param {String} key
             * @return {boolean}
             */
            has(key) {
                return typeof registry[key] !== 'undefined';
            }
        };
    };
});