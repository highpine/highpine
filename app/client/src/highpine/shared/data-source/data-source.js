define([], function() {

    /**
     * Data Source.
     */
    class DataSource {
        /**
         * @param {String} key
         * @param {String} name
         * @param {Object} apiClient
         */
        constructor(key, name, apiClient) {
            this._authorized = false;
            this._key = key;
            this._name = name;
            this._apiClient = apiClient;
        }
        get isAuthorized() {
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

        get name() {
            return this._name;
        }

        get key() {
            return this._key;
        }

        get apiClient() {
            return this._apiClient;
        }

        /**
         * @deprecated
         * @return {null|Object}
         */
        getApiClient() {
            return this._apiClient;
        }
    }

    return DataSource;
});