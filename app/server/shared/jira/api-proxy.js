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
 * Jira API Proxy.
 */
class JiraApiProxy extends AbstractApiProxy {
    /**
     * @param {string} serviceUrl - Jira base URL.
     * @param {string} mountPath - Proxy mount path. Will be cut off from the request url.
     * @param {string} apiVersion - API version. Optional. Default is 'latest'.
     * @param {string} authVersion - Auth API version. Optional. Default is 'latest'.
     * @param {{consumer_key: String, consumer_secret: String}} oauth - Oauth Token
     */
    constructor(serviceUrl, mountPath, apiVersion, authVersion, oauth) {
        super(serviceUrl, mountPath);

        this.headersPreset = Object.assign(this.headersPreset, proxyConfig.headersPreset);
        this.proxyHeaderPrefix = proxyConfig.proxyHeaderPrefix;

        this.apiVersion = apiVersion || 'latest';
        this.authVersion = authVersion || 'latest';

        this.oauth = oauth;

        this.authorizationStrategies = new Map([
            ['basic', basicAuthorizationStrategy],
            ['cookies', cookiesAuthorizationStrategy],
            ['oauth', oauthAuthorizationStrategy],
        ]);
    }

    getRemoteApiPath(relativeUrl) {
        return isAuthRequest(relativeUrl) ?
            proxyConfig.remoteAuthPath + '/' + this.apiVersion :
            proxyConfig.remoteApiPath + '/' + this.authVersion;
    }

    authorizeRequest(options) {
        let userToken = this.getUserToken();
        if (!userToken || !this.authorizationStrategies.has(userToken.type)) {
            return;
        }
        return this.authorizationStrategies.get(userToken.type)(options, userToken);
    }
}

function isAuthRequest(requestUrl) {
    return proxyConfig.authResources.some(function (resource) {
        return requestUrl.indexOf(resource) === 0;
    });
}

function basicAuthorizationStrategy(options, userToken) {
    options.auth = options.auth || {};
    options.auth.username = userToken.username;
    options.auth.password = userToken.password;

    return options;
}

function cookiesAuthorizationStrategy(options, userToken) {
    options.headers = options.headers || {};
    options.headers.cookie = userToken.name + '=' + userToken.value;

    return options;
}

function oauthAuthorizationStrategy(options, userToken) {
    options.oauth = {
        consumer_key: this.oauth.consumer_key,
        consumer_secret: this.oauth.consumer_secret,
        signature_method: 'RSA-SHA1',
        token: userToken.accessToken,
        token_secret: userToken.accessTokenSecret
    };

    return options;
}

module.exports = JiraApiProxy;