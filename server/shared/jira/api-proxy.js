var AbstractApiProxy = require('shared/api-proxy-manager').AbstractApiProxy;
var proxyConfig = require('./config.json');

/**
 * Jira Api Proxy.
 *
 * @param {string} serviceUrl - Jira base URL.
 * @param {string} mountPath - Proxy mount path. Will be cut off from the request url.
 * @param {string} apiVersion - Api version. Optional. Default is 'latest'.
 * @param {string} authVersion - Auth version. Optional. Default is 'latest'.
 * @constructor
 */
var JiraApiProxy = function (serviceUrl, mountPath, apiVersion, authVersion) {

    AbstractApiProxy.call(this, serviceUrl, mountPath);

    this.headersPreset = Object.assign(this.headersPreset, proxyConfig.headersPreset);
    this.proxyHeaderPrefix = proxyConfig.proxyHeaderPrefix;

    this.apiVersion = apiVersion || 'latest';
    this.authVersion = authVersion || 'latest';
};

JiraApiProxy.prototype = Object.create(AbstractApiProxy.prototype);
JiraApiProxy.prototype.constructor = JiraApiProxy;

(function () {

    function isAuthRequest(requestUrl) {
        return proxyConfig.authResources.some(function (resource) {
            return requestUrl.indexOf(resource) === 0;
        });
    }

    JiraApiProxy.prototype.getRemoteApiPath = function(relativeUrl) {
        return isAuthRequest(relativeUrl) ?
            proxyConfig.remoteAuthPath + '/' + this.apiVersion :
            proxyConfig.remoteApiPath + '/' + this.authVersion;
    };

    JiraApiProxy.prototype.authorizeRequest = function (options) {
        if (this.getUserToken()) {
            options.headers.cookie = this.getUserToken().name + '=' + this.getUserToken().value;
        }
    };

})();

module.exports = JiraApiProxy;