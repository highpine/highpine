var Auth = require('shared/auth');

var jiraDataService = {
    getKey: function() {
        return 'jira';
    },
    getProxyRegistry: function(req) {
        return req.app.get('jira-proxy-registry');
    },
    authorize: function (req, callback) {
        // todo: maybe just pass username, password, session and callback
        var proxyRegistry = this.getProxyRegistry(req);
        var request = {__proto__: req};
        request.originalUrl = request.url = '/session';
        proxyRegistry.anonymous().relay(request, function (error, apiResponse, body) {
            if (error) {
                callback(null, {
                    status: Auth.STATUS_ERROR,
                    result: error
                });
                return;
            }

            if (apiResponse.statusCode != 200 || !body.session) {
                callback(null, {
                    status: Auth.STATUS_ERROR,
                    statusCode: apiResponse.statusCode,
                    result: body
                });
                return;
            }

            proxyRegistry.registerToken(body.session);
            req.session.jiraToken  = body.session;

            callback(null, {
                status: Auth.STATUS_SUCCESS,
                result: body
            });
        });
    },
    unauthorize: function(req) {
        var proxyRegistry = this.getProxyRegistry(req);
        proxyRegistry.dropToken(req.session.jiraToken);
        delete req.session.jiraToken;
    },
    isAuthorized: function(req) {
        return typeof req.session.jiraToken !== 'undefined';
    }
};

module.exports = jiraDataService;