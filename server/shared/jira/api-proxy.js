let AbstractApiProxy = require('shared/api-proxy-manager').AbstractApiProxy;
let proxyConfig = require('./config.json');

/**
 * Jira Api Proxy.
 *
 * @param {string} serviceUrl - Jira base URL.
 * @param {string} mountPath - Proxy mount path. Will be cut off from the request url.
 * @param {string} apiVersion - Api version. Optional. Default is 'latest'.
 * @param {string} authVersion - Auth version. Optional. Default is 'latest'.
 * @param {object} oauth - OAuth configuration.
 * @constructor
 */
let JiraApiProxy = function (serviceUrl, mountPath, apiVersion, authVersion, oauth) {

    AbstractApiProxy.call(this, serviceUrl, mountPath);

    this.headersPreset = Object.assign(this.headersPreset, proxyConfig.headersPreset);
    this.proxyHeaderPrefix = proxyConfig.proxyHeaderPrefix;

    this.apiVersion = apiVersion || 'latest';
    this.authVersion = authVersion || 'latest';

    this.oauth = oauth;
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
        let userToken = this.getUserToken();
        if (userToken) {
            switch (userToken.type) {
                case 'basic':
                    options.auth = options.auth || {};
                    options.auth.username = userToken.username;
                    options.auth.password = userToken.password;
                    break;
                case 'cookies':
                    options.headers = options.headers || {};
                    options.headers.cookie = userToken.name + '=' + userToken.value;
                    break;
                case 'oauth':
                    options.oauth = {
                        consumer_key: this.oauth.consumer_key,
                        consumer_secret: this.oauth.consumer_secret,
                        signature_method: 'RSA-SHA1',
                        token: userToken.accessToken,
                        token_secret: userToken.accessTokenSecret
                    };
                    break;
                default:
                    break;
            }
        }
    };

})();

module.exports = JiraApiProxy;