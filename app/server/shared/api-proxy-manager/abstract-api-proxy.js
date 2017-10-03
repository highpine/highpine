/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

let url = require('url');
let querystring = require('querystring');
let request = require('request');

class AbstractApiProxy {
    constructor(serviceUrl, mountPath) {
        this.urlOptions = url.parse(serviceUrl);
        this.mountPath = mountPath;

        this.proxyHeaderPrefix = 'X-Api-Proxy-';
        this.headersPreset = {};

        this.strictSSL = true;
        this.debugMode = false;
        this.userToken = null;
    }

    setUserToken(token) {
        this.userToken = token;
    }

    getUserToken() {
        return this.userToken;
    }

    setStrictSSL(strictSSL) {
        this.strictSSL = !!strictSSL;
    }

    setDebugMode(debugMode) {
        this.debugMode = !!debugMode;
    }

    /**
     * Proxy headers matching starting with "X-Api-Proxy-" from original request to Jira Api.
     * You may change this.proxyHeaderPrefix to adjust the prefix value.
     *
     * @param {Object} originalHeaders
     * @returns {Object}
     */
    proxyHeaders(originalHeaders) {
        let proxyHeaderPrefix = this.proxyHeaderPrefix;
        return Object.keys(originalHeaders).reduce(function (previous, originalHeaderKey) {
            if (originalHeaderKey.indexOf(proxyHeaderPrefix) === 0) {
                let headerKey = originalHeaderKey.substring(proxyHeaderPrefix.length);
                previous[headerKey] = originalHeaders[originalHeaderKey];
            }
            return previous;
        }, this.headersPreset);
    }

    proxyParams(originalParams) {
        return originalParams;
    }

    proxyMethod(originalMethod) {
        return originalMethod;
    }

    proxyUrl(originalUrl) {
        let remotePath = this.getRemoteApiPath(originalUrl);
        let relativeUrl = this.getRelativeUrl(originalUrl);
        let uri = url.format({
            protocol: this.urlOptions.protocol,
            hostname: this.urlOptions.hostname,
            port: this.urlOptions.port,
            pathname: remotePath + relativeUrl
        });
        return decodeURIComponent(uri);
    }

    /**
     * Get remote api path basing on the requested URL.
     *
     * @param {String} originalUrl
     * @returns {string}
     * @abstract
     */
    getRemoteApiPath(originalUrl) {
        return '';
    }

    getRelativeUrl(originalUrl) {
        return originalUrl.replace(this.mountPath, '');
    }

    /**
     * Inject user token to the relayed request options in an API-specific way.
     *
     * @param {Object} options Relayed request options
     * @return {Object} Modified options
     * @abstract
     */
    authorizeRequest(options) {
        // Normally add this.getUserToken() to options somehow.
    }

    /**
     * Relay the Express request object to the API.
     *
     * @param {Object} request Express request object
     * @param {Function} callback
     */
    relay(request, callback) {
        let options = {};
        options.url = this.proxyUrl(request.originalUrl || request.url);
        options.method = this.proxyMethod(request.method);

        request.headers = request.headers || {};
        options.headers = this.proxyHeaders(request.headers);

        options.json = true;
        if (request.is('json')) {
            options.body = this.proxyParams(request.body);
        } else {
            options.body = querystring.stringify(this.proxyParams(request.params));
        }

        this.request(options, callback);
    }

    /**
     * Make a request to the proxied API providing a list of options.
     *
     * @param {Object} options
     * @param {Function} callback
     */
    request(options, callback) {
        options.rejectUnauthorized = this.strictSSL;
        this.authorizeRequest(options);

        let debugMode = this.debugMode;
        if (debugMode) {
            console.log('Requesting:', options);
        }

        request(options, function (error, response, body) {
            //debugMode && console.log(error, response && response.statusCode, body);
            callback(error, response, body);
        });
    }
}

module.exports = AbstractApiProxy;