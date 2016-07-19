var Auth = require('shared/auth');

var gitlabDataService = {
    getKey: function() {
        return 'gitlab';
    },
    getProxyRegistry: function(req) {
        return req.app.get('gitlab-proxy-registry');
    },
    authorize: function (req, callback) {
        // todo: maybe just pass username, password, session and callback
        var proxyRegistry = this.getProxyRegistry(req);
        var request = {__proto__: req};
        request.originalUrl = request.url = '/session';
        request.body = {
            login: req.body.username,
            password: req.body.password
        };
        proxyRegistry.anonymous().relay(request, function (error, apiResponse, body) {
            if (error) {
                callback(null, {
                    status: Auth.STATUS_ERROR,
                    result: error
                });
                return;
            }

            if (apiResponse.statusCode != 201 || !body.private_token) {
                callback(null, {
                    status: Auth.STATUS_ERROR,
                    statusCode: apiResponse.statusCode,
                    result: body
                });
                return;
            }

            proxyRegistry.registerToken(body.private_token);
            req.session.gitlabToken  = body.private_token;

            callback(null, {
                status: Auth.STATUS_SUCCESS,
                result: body
            });
        });
    },
    unauthorize: function(req) {
        var proxyRegistry = this.getProxyRegistry(req);
        proxyRegistry.dropToken(req.session.gitlabToken);
        delete req.session.gitlabToken;
    },
    isAuthorized: function(req) {
        return typeof req.session.gitlabToken !== 'undefined';
    }
};

module.exports = gitlabDataService;