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
 * Gitlab API Proxy.
 */
class GitlabApiProxy extends AbstractApiProxy {
    /**
     * @param {string} serviceUrl - Gitlab base URL.
     * @param {string} mountPath - Proxy mount path. Will be cut off from the request url.
     * @param {string} apiVersion - Api version. Optional. Default is 'latest'.
     * @constructor
     */
    constructor(serviceUrl, mountPath, apiVersion) {
        super(serviceUrl, mountPath);

        this.headersPreset = Object.assign(this.headersPreset, proxyConfig.headersPreset);
        this.proxyHeaderPrefix = proxyConfig.proxyHeaderPrefix;

        this.apiVersion = apiVersion || 'v4';
    };

    getRemoteApiPath(relativeUrl) {
        return proxyConfig.remoteApiPath + '/' + this.apiVersion;
    }

    authorizeRequest(options) {
        const userToken = this.getUserToken();
        if (!userToken) {
            return;
        }
        options.headers = options.headers || [];
        // @see: https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html
        options.headers['Authorization'] = 'Bearer ' + userToken.accessToken;
    }
}

module.exports = GitlabApiProxy;