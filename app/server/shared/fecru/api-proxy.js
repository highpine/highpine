var AbstractApiProxy = require('shared/api-proxy-manager').AbstractApiProxy;
var proxyConfig = require('./config.json');

/**
 * Fecru Api Proxy.
 *
 * @param {string} serviceUrl - Fecru base URL.
 * @param {string} mountPath - Proxy mount path. Will be cut off from the request url.
 * @param {string} apiVersion - Api version. Optional. Default is 'latest'.
 * @param {string} apiToken - API Token
 * @constructor
 */
var FecruApiProxy = function (serviceUrl, mountPath, apiVersion, apiToken) {

    AbstractApiProxy.call(this, serviceUrl, mountPath);

    this.headersPreset = Object.assign(this.headersPreset, proxyConfig.headersPreset);
    this.proxyHeaderPrefix = proxyConfig.proxyHeaderPrefix;

    this.apiVersion = apiVersion || 'latest';
    this.apiToken = apiToken;
};

FecruApiProxy.prototype = Object.create(AbstractApiProxy.prototype);
FecruApiProxy.prototype.constructor = FecruApiProxy;

(function () {

    FecruApiProxy.prototype.getRemoteApiPath = function () {
        return proxyConfig.remoteApiPath + '/' + this.apiVersion;
    };

    FecruApiProxy.prototype.authorizeRequest = function (options) {
        if (this.getUserToken()) {
            options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') +
                proxyConfig.authTokenKey + '=' + this.getUserToken();
        }
    };

})();

module.exports = FecruApiProxy;