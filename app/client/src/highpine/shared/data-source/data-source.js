define([], function() {

    /**
     * Data Source.
     */
    class DataSource {
        constructor(key, name, apiClient) {
            this._authorized = false;
            this.key = key;
            this.name = name;
            this.apiClient = apiClient;
        }
        isAuthorized() {
            // todo: maybe check using the API client.
            return this._authorized;
        }
        authorize() {
            this._authorized = true;
        }
        unauthorize() {
            this._authorized = false;
        }
        onUnauthorized() {
            this.unauthorize();
        }
        /**
         * @abstract
         * @returns {string}
         */
        getName() {
            return this.name;
        }
        /**
         * @abstract
         * @returns {string}
         */
        getKey() {
            return this.key;
        }
        /**
         * @abstract
         * @returns {null|Object}
         */
        getApiClient() {
            return this.apiClient;
        }
    }

    return DataSource;
});