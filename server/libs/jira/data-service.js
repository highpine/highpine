var Auth = require('libs/auth');

var jiraDataService = {
    authorize: function (req, callback) {
        var jiraProxyRegistry = req.app.get('jira-proxy-registry');
        var request = {__proto__: req};
        request.originalUrl = request.url = '/session';
        jiraProxyRegistry.anonymous().relay(request, function (error, jiraResponse, body) {
            if (error) {
                callback({
                    status: Auth.STATUS_ERROR,
                    result: error
                });
                return;
            }
            if (jiraResponse.statusCode != 200 || !body.session) {
                var customError = new Error('Login failed');
                customError.status = 401;
                callback(customError);
                return;
            }
            jiraProxyRegistry.registerToken(body.session);
            req.session.jiraToken = body.session;
            callback(null, {
                status: Auth.STATUS_SUCCESS,
                result: body
            });
        });
    }
};

module.exports = jiraDataService;