var express = require('express');
var router = express.Router();
var async = require('async');
var Auth = require('libs/auth');
var jiraDataService = require('libs/jira/data-service');

var mainDataProvider = 'jira';
var requiredDataProviders = [mainDataProvider];

router.post('/login', function (req, res, next) {

    async.parallel({
        jira: function (callback) {
            jiraDataService.authorize(req, callback);
        },
        // Just for testing
        badService: function(callback) {
            callback(null, {
                status: Auth.STATUS_ERROR,
                result: {message:'Well, I\'m a bad service.'}
            });
        }
    }, function(err, results) {
        var loginFailed = err || requiredDataProviders.some(function(dataProviderName) {
            return results[dataProviderName].status == Auth.STATUS_ERROR;
        });
        if (loginFailed) {
            res.statusCode = 401;
            res.json({
                status: Auth.STATUS_ERROR,
                error: err,
                dataServices: results
            });
            return;
        }
        res.json({
            status: Auth.STATUS_SUCCESS,
            dataServices: results
        });
    });
});

router.post('/logout', function (req, res, next) {
    var jiraProxyRegistry = req.app.get('jira-proxy-registry');
    jiraProxyRegistry.dropToken(req.session.jiraToken);
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
