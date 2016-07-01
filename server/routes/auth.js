var express = require('express');
var router = express.Router();
var async = require('async');

router.post('/login', function (req, res, next) {
    async.parallel([
        function(callback) {
            var jiraProxy = req.app.get('jira-proxy');
            var request = {__proto__: req};
            request.originalUrl = request.url = '/session';
            jiraProxy.anonymous().relay(request, function(error, jiraResponse, body) {
                if (error) {
                    callback(error);
                    return;
                }
                if (jiraResponse.statusCode != 200 || !body.session) {
                    var customError = new Error('Login failed');
                    customError.status = 401;
                    callback(customError);
                    return;
                }
                jiraProxy.registerToken(body.session);
                req.session.jiraToken = body.session;
                callback();
            });
        }
    ], function(err, results) {
        if (err) {
            res.statusCode = 401;
            res.json({
                status: 'error',
                message: err
            });
            return;
        }
        res.json({
            status: 'success',
            results: results
        });
    });
});

router.post('/logout', function (req, res, next) {
    var jiraProxy = req.app.get('jira-proxy');
    jiraProxy.dropToken(req.session.jiraToken);
    req.session.destroy();
    res.json({
        status: 'success'
    });
});

router.get('/verify', function (req, res, next) {
    if (!req.session.jiraToken) {
        res.statusCode = 401;
    }
    res.end();
});

module.exports = router;
