var querystring = require('querystring');

/**
 * Jira Api Proxy Registry.
 *
 * @param {function} proxyFactory - Api Proxy factory
 * @constructor
 */
var ApiProxyRegistry = function (proxyFactory) {

    var anonymous;
    var proxiesRegistry = {};

    function authorizedProxyFactory(token) {
        var proxy = proxyFactory();
        proxy.setUserToken(token);
        return proxy;
    }

    function getTokenHash(token) {
        return querystring.stringify(token);
    }

    this.anonymous = function () {
        if (!anonymous) {
            anonymous = proxyFactory();
        }
        return anonymous;
    };

    this.withToken = function (token) {
        if (!token) {
            return this.anonymous();
        }
        this.registerToken(token);
        var tokenHash = getTokenHash(token);
        return proxiesRegistry[tokenHash];
    };

    this.registerToken = function (token) {
        var tokenHash = getTokenHash(token);
        if (!(tokenHash in proxiesRegistry)) {
            proxiesRegistry[tokenHash] = authorizedProxyFactory(token);
        }
    };

    this.dropToken = function (token) {
        var tokenHash = getTokenHash(token);
        if (tokenHash in proxiesRegistry) {
            delete proxiesRegistry[tokenHash];
        }
    };
};

module.exports = ApiProxyRegistry;
