var url = require('url');
var querystring = require('querystring');
var request = require('request');

/**
 * Abstract Api Proxy.
 *
 * @param {string} serviceUrl - Fecru base URL.
 * @param {string} mountPath - Proxy mount path. Will be cut off from the request url.
 * @constructor
 */
var AbstractApiProxy = function (serviceUrl, mountPath) {

    this.urlOptions = url.parse(serviceUrl);
    this.mountPath = mountPath;

    this.proxyHeaderPrefix = 'X-Api-Proxy-';
    this.headersPreset = {};

    this.strictSSL = true;
    this.debugMode = false;
    this.userToken = null;
};

(function () {

    this.setUserToken = function (token) {
        this.userToken = token;
    };

    this.getUserToken = function () {
        return this.userToken;
    };

    this.setStrictSSL = function (strictSSL) {
        this.strictSSL = !!strictSSL;
    };

    this.setDebugMode = function (debugMode) {
        this.debugMode = !!debugMode;
    };

    /**
     * Proxy headers matching starting with "X-Jira-Proxy-" from original request to Jira Api.
     * @param {object} originalHeaders
     * @returns {object}
     */
    this.proxyHeaders = function (originalHeaders) {
        var proxyHeaderPrefix = this.proxyHeaderPrefix;
        return Object.keys(originalHeaders).reduce(function (previous, originalHeaderKey) {
            if (originalHeaderKey.indexOf(proxyHeaderPrefix) === 0) {
                var headerKey = originalHeaderKey.substring(proxyHeaderPrefix.length);
                previous[headerKey] = originalHeaders[originalHeaderKey];
            }
            return previous;
        }, this.headersPreset);
    };

    this.proxyParams = function (originalParams) {
        return originalParams;
    };

    this.proxyMethod = function (originalMethod) {
        return originalMethod;
    };

    this.proxyUrl = function (originalUrl) {
        var remotePath = this.getRemoteApiPath(originalUrl);
        var relativeUrl = this.getRelativeUrl(originalUrl);
        var uri = url.format({
            protocol: this.urlOptions.protocol,
            hostname: this.urlOptions.hostname,
            port: this.urlOptions.port,
            pathname: remotePath + relativeUrl
        });
        return decodeURIComponent(uri);
    };

    /**
     * @abstract
     * @returns {string}
     */
    this.getRemoteApiPath = function() {
        return '';
    };

    this.getRelativeUrl = function (originalUrl) {
        return originalUrl.replace(this.mountPath, '');
    };

    /**
     * @abstract
     * @param options
     */
    this.authorizeRequest = function (options) {
        // Normally add this.getUserToken() to options somehow.
    };

    this.relay = function (request, callback) {
        var options = {};
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
    };

    this.request = function (options, callback) {
        options.rejectUnauthorized = this.strictSSL;
        this.authorizeRequest(options);

        var debugMode = this.debugMode;
        if (debugMode) {
            console.log('Requesting:', options);
        }

        request(options, function (error, response, body) {
            //debugMode && console.log(error, response && response.statusCode, body);
            callback(error, response, body);
        });
    };

}).call(AbstractApiProxy.prototype);

module.exports = AbstractApiProxy;