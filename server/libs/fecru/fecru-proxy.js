var url = require('url');
var querystring = require('querystring');

var FecruApiProxy = function (serviceUrl, mountPath, apiVersion, apiToken) {

    apiVersion = apiVersion || 'latest';
    var remoteApiPath = '/rest/api/' + apiVersion;

    var urlOptions = url.parse(serviceUrl);
    var userToken;

    this.requestLib = require('request');
    this.strictSSL = true;

    var proxyHeaderPrefix = 'X-Fecru-Proxy-';
    var headersPreset = {
        accept: 'application/json'
    };
    function proxyHeaders(originalHeaders) {
        var prefixLength = proxyHeaderPrefix.length;
        return Object.keys(originalHeaders).reduce(function(previous, header) {
            if (header.indexOf(proxyHeaderPrefix) === 0) {
                previous[header.substring(prefixLength)] = originalHeaders[header];
            }
            return previous;
        }, headersPreset);
    }

    function proxyParams(originalParams) {
        return originalParams;
    }

    this.authorizeRequest = function(options) {
        if (userToken) {
            options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + 'FEAUTH=' + userToken;
        }
    };

    this.proxyUrl = function(originalUrl) {
        originalUrl = originalUrl.replace(mountPath, '');
        var uri = url.format({
            protocol: urlOptions.protocol,
            hostname: urlOptions.hostname,
            port: urlOptions.port,
            pathname: remoteApiPath + originalUrl
        });
        return decodeURIComponent(uri);
    };

    this.relay = function(request, callback) {
        var options = {};
        options.url = this.proxyUrl(request.originalUrl || request.url);
        options.method = request.method;

        request.headers = request.headers || {};
        options.headers = proxyHeaders(request.headers);

        if (request.is('json')) {
            options.json = true;
            options.body = proxyParams(request.body);
        } else {
            options.body = querystring.stringify(proxyParams(request.params));
        }

        this.request(options, callback);
    };

    this.request = function(options, callback) {
        options.rejectUnauthorized = this.strictSSL;
        this.authorizeRequest(options);

        console.log('Requesting:', options);
        this.requestLib(options, function(error, response, body) {
            console.log(error, response.statusCode, body);
            callback(error, response, body);
        });
    };

    this.setStrictSSL = function(strictSSL) {
        this.strictSSL = !!strictSSL;
    };

    this.setUserToken = function(token) {
        userToken = token;
    };
};

(function() {
}).call(FecruApiProxy.prototype);

module.exports.JiraApiProxy = FecruApiProxy;