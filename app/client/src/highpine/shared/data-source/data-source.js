define([], function() {

    /**
     * Data Source.
     */
    class DataSource {
        /**
         * @param {String} key
         * @param {String} name
         * @param {Object} apiClient
         * @param {{get: Function}} userStorage
         * @param {String} authComponentName
         */
        constructor(key, name, apiClient, userStorage, authComponentName) {
            this._key = key;
            this._name = name;
            this._apiClient = apiClient;
            this._userStorage = userStorage;
            this._authComponentName = authComponentName;
        }

        get isAuthorized() {
            const user = this._userStorage.get();
            if (!user || !user.auth_tokens) {
                return false;
            }
            return typeof user.auth_tokens[this.key] !== 'undefined';
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

        get authComponentName() {
            return this._authComponentName;
        }
    }

    return DataSource;
});