/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

let AbstractDataService = require('shared/data-services-manager').AbstractDataService;
let querystring = require('querystring');
let Auth = require('shared/auth');

class FecruDataService extends AbstractDataService {

    getKey() {
        return 'fecru';
    }

    authorize(username, password, callback) {
        let anonymousProxy = this.proxyRegistry.anonymous();
        let options = {
            url: anonymousProxy.proxyUrl('/rest-service-fecru/auth/login'),
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            json: true,
            body: querystring.stringify({
                userName: username,
                password: password
            })
        };
        anonymousProxy.request(options, function (error, apiResponse, body) {
            if (error) {
                return callback(error);
            }
            if (apiResponse.statusCode !== 200 || !body.token) {
                let error = new Error(
                    body.error || 'Fecru authorization failed.'
                );
                error.statusCode = apiResponse.statusCode;
                error.responseBody = body;
                callback(error);
                return;
            }

            callback(null, {
                token: body.token
            });
        });
    }
}

var fecruDataService_ = {
    getKey: function() {
        return 'fecru';
    },
    getProxyRegistry: function(req) {
        return req.app.get('fecru-proxy-registry');
    },
    authorize: function (req, callback) {
        // todo: maybe just pass username, password, session and callback
        var proxyRegistry = this.getProxyRegistry(req);
        var request = {__proto__: req};
        request.originalUrl = request.url = '/rest-service-fecru/auth/login';
        request.params.userName = request.body.username;
        proxyRegistry.anonymous().relay(request, function (error, apiResponse, body) {
            if (error) {
                callback(null, {
                    status: Auth.STATUS_ERROR,
                    result: error
                });
                return;
            }

            if (apiResponse.statusCode != 200 || !body.token) {
                callback(null, {
                    status: Auth.STATUS_ERROR,
                    statusCode: apiResponse.statusCode,
                    result: body
                });
                return;
            }

            proxyRegistry.registerToken(body.token);
            req.session.fecruToken = body.token;

            callback(null, {
                status: Auth.STATUS_SUCCESS,
                result: body
            });
        });
    },
    unauthorize: function(req) {
        var proxyRegistry = this.getProxyRegistry(req);
        proxyRegistry.dropToken(req.session.fecruToken);
        delete req.session.fecruToken;
    },
    isAuthorized: function(req) {
        return typeof req.session.fecruToken !== 'undefined';
    }
};

module.exports = FecruDataService;