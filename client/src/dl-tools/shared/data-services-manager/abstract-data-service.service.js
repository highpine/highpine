define([], function() {
    /**
     * Abstract data service. Mainly as an interface here.
     * Use angular.extend to extend it if you need:
     * var jiraDataService = angular.extend({...}, abstractDataService);
     */
    return function factory() {
        return {
            _authorized: false,
            isAuthorized: function () {
                return this._authorized;
            },
            authorize: function () {
                this._authorized = true;
            },
            unauthorize: function () {
                this._authorized = false;
            },
            onUnauthorized: function () {
                this.unauthorize();
            },
            getName: function () {
                return '[Abstract]';
            },
            getKey: function() {
                return '[abstract]';
            }
        };
    };
});