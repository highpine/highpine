/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

let AbstractApiProxy = require('shared/api-proxy-manager').AbstractApiProxy;
let proxyConfig = require('./config.json');

/**
 * Fecru Api Proxy
 */
class FecruApiProxy extends AbstractApiProxy {
    /**
     * @param {string} serviceUrl - Fecru base URL.
     * @param {string} mountPath - Proxy mount path. Will be cut off from the request url.
     * @param {string} apiVersion - Api version. Optional. Default is 'latest'.
     * @param {string} apiToken - API Token. Only required for specific admin operations.
     *        @see: https://confluence.atlassian.com/fisheye/setting-the-rest-api-token-317197023.html
     */
    constructor(serviceUrl, mountPath, apiVersion, apiToken = null) {
        super(serviceUrl, mountPath);

        this.headersPreset = Object.assign(this.headersPreset, proxyConfig.headersPreset);
        this.proxyHeaderPrefix = proxyConfig.proxyHeaderPrefix;

        this.apiVersion = apiVersion || 'latest';
        this.apiToken = apiToken;
    }

    getRemoteApiPath() {
        return proxyConfig.remoteApiPath + '/' + this.apiVersion;
    }

    authorizeRequest(options) {
        if (this.apiToken) {
            options.headers = options.headers || {};
            // @see: https://confluence.atlassian.com/fisheye/setting-the-rest-api-token-317197023.html
            options.headers['X-Api-Key'] = this.apiToken;
            return;
        }
        let userToken = this.getUserToken();
        if (!userToken) {
            return;
        }
        options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + proxyConfig.authTokenKey + '=' + userToken.token;
    }
}

module.exports = FecruApiProxy;