var express = require('express');
var router = express.Router();

router.post('/authorize', function (req, res, next) {
    var jiraProxy = req.app.get('jira-proxy');
    var request = {__proto__: req};
    request.originalUrl = request.url = '/session';
    jiraProxy.anonymous().relay(request, function(error, jiraResponse, body) {
        if (error) {
            next(error);
            return;
        }
        if (body && body.session) {
            jiraProxy.registerToken(body.session);
            req.session.jiraToken = body.session;
        }
        res.statusCode = jiraResponse.statusCode;
        res.append('Content-Type', jiraResponse.headers['content-type']);
        res.json(body);
    });
});

router.get(/\/proxy(\/.*)?/, function(req, res, next) {
    var jiraProxy = req.app.get('jira-proxy');
    jiraProxy.withToken(req.session.jiraToken)
        .relay(req, function(error, response, body) {
            if (error) {
                next(error);
                return;
            }
            res.statusCode = response.statusCode;
            res.append('Content-Type', response.headers['content-type']);
            res.end(body);
        });
});

module.exports = router;
