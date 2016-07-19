var AbstractApiProxy = require('shared/api-proxy-manager').AbstractApiProxy;
var proxyConfig = require('./config.json');

/**
 * Gitlab Api Proxy.
 *
 * @param {string} serviceUrl - Gitlab base URL.
 * @param {string} mountPath - Proxy mount path. Will be cut off from the request url.
 * @param {string} apiVersion - Api version. Optional. Default is 'latest'.
 * @constructor
 */
var GitlabApiProxy = function (serviceUrl, mountPath, apiVersion) {

    AbstractApiProxy.call(this, serviceUrl, mountPath);

    this.headersPreset = Object.assign(this.headersPreset, proxyConfig.headersPreset);
    this.proxyHeaderPrefix = proxyConfig.proxyHeaderPrefix;

    this.apiVersion = apiVersion || 'v3';
};

GitlabApiProxy.prototype = Object.create(AbstractApiProxy.prototype);
GitlabApiProxy.prototype.constructor = GitlabApiProxy;

(function () {

    GitlabApiProxy.prototype.getRemoteApiPath = function () {
        return proxyConfig.remoteApiPath + '/' + this.apiVersion;
    };

    GitlabApiProxy.prototype.authorizeRequest = function (options) {
        if (this.getUserToken()) {
            options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') +
                proxyConfig.authTokenKey + '=' + this.getUserToken();
        }
    };

})();

module.exports = GitlabApiProxy;