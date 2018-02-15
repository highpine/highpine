define([], function() {
    /* @ngInject */
    return function() {
        /**
         * Data sources registry.
         * @type {object}
         */
        let registry = {};

        return {
            /**
             * Register data service.
             * @param {DataSource} dataSource
             */
            register(dataSource) {
                let key = dataSource.getKey();
                if (this.has(key)) {
                    throw new Error(`Data Source with key "${key}" is already registered.`);
                }
                registry[key] = dataSource;
            },
            /**
             * Get registered services as an array.
             * @return {DataSource[]}
             */
            getAll() {
                return Object.keys(registry).map(key => registry[key]);
            },
            /**
             * Get data source by its key.
             * @param {String} key
             * @return {DataSource|null}
             */
            get(key) {
                return registry[key] || null;
            },
            /**
             * Check if data source with given key is already registered.
             * @param {String} key
             * @return {boolean}
             */
            has(key) {
                return typeof registry[key] !== 'undefined';
            }
        };
    };
});