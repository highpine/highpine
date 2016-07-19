var Auth = require('shared/auth');

var fecruDataService = {
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

        request.originalUrl = request.url = '/rest-service/auth-v1/login';
        request.params = {
            userName: req.body.username,
            password: req.body.password
        };
        request.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Fecru-Proxy-Content-Type': 'application/x-www-form-urlencoded'
        };

        proxyRegistry.anonymous().relay(request, function (error, apiResponse, body) {
            if (error) {
                callback(null, {
                    status: Auth.STATUS_ERROR,
                    result: error
                });
                return;
            }

            if (apiResponse.statusCode != 200 || !body.token) {
                var customError = new Error('Login failed');
                customError.status = 401;
                callback(null, customError);
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

module.exports = fecruDataService;