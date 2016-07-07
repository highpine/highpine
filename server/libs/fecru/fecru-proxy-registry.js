var fecru = require('../lib/fecru-proxy');

module.exports = function(fecruUrl, mountPath) {
    var proxiesRegistry = {};
    function authorizedFecruProxyFactory (token) {
        var fecruProxy = fecruProxyFactory();
        fecruProxy.setUserToken(token);
        return fecruProxy;
    }
    function fecruProxyFactory () {
        var fecruProxy = new fecru.FecruApiProxy(fecruUrl, mountPath);
        fecruProxy.setStrictSSL(false);
        return fecruProxy;
    }
    function getTokenHash(token) {
        return token;
    }
    return {
        anonymous: fecruProxyFactory(),
        withToken: function(token) {
            if (!token) {
                return this.anonymous;
            }
            var tokenHash = getTokenHash(token);
            if (!(tokenHash in proxiesRegistry)) {
                proxiesRegistry[tokenHash] = authorizedFecruProxyFactory(token);
            }
            return proxiesRegistry[tokenHash];
        },
        dropToken: function(token) {
            var tokenHash = getTokenHash(token);
            if (tokenHash in proxiesRegistry) {
                delete proxiesRegistry[tokenHash];
            }
        }
    };
};