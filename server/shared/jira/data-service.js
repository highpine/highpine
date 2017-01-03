let Auth = require('shared/auth');

function JiraDataService(JiraProxyRegistry) {
    this.jiraProxyRegistry = JiraProxyRegistry;
}

JiraDataService.prototype.getKey = function() {
    return 'jira';
};

JiraDataService.prototype.getProxyRegistry = function() {
    return this.jiraProxyRegistry;
};

JiraDataService.prototype.authorize = function(username, password, callback) {
    let anonymousProxy = this.jiraProxyRegistry.anonymous();
    let options = {
        url: anonymousProxy.proxyUrl('/session'),
        method: 'POST',
        json: true,
        body: {
            username: username,
            password: password
        }
    };
    anonymousProxy.request(options, function (error, apiResponse, body) {
        if (error) {
            return callback(error);
        }
        if (apiResponse.statusCode !== 200 || !body.session) {
            let error = new Error('Authorization failed.');
                error.statusCode = apiResponse.statusCode;
                error.responseBody = body;
            callback(error);
            return;
        }

        callback(null, {
            token: body.session
        });
    });
};

/**
 * @deprecated
 * @param session
 */
JiraDataService.prototype.unauthorize = function(session) {
    this.jiraProxyRegistry.dropToken(session.jiraToken);
    delete session.jiraToken;
};

/**
 * @deprecated
 * @param req
 */
JiraDataService.prototype.isAuthorized = function(req) {
    return typeof req.session.jiraToken !== 'undefined';
};

module.exports = JiraDataService;