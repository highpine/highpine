var express = require('express');
var router = express.Router();
var async = require('async');
var auth = require('./auth');
var DataServicesManager = require('shared/data-services-manager').manager;

// todo: find a way to remove this.
var requiredDataProviders = ['jira', 'fecru'];

router.post('/login', function (req, res, next) {
    var parallelCallStack = {};
    DataServicesManager.getServices().forEach(function(dataService) {
        parallelCallStack[dataService.getKey()] = (function(dataService) {
            return function(callback) {
                // todo: don't pass a whole request, but just username, password, session
                dataService.authorize(req, function (__not_used__, result) {
                    // todo: remove first parameter as not used.
                    callback(null, result);
                });
            };
        })(dataService);
    });
    async.parallel(parallelCallStack, function(err, results) {
        var loginFailed = err || requiredDataProviders.some(function(dataProviderName) {
            return results[dataProviderName].status == auth.STATUS_ERROR;
        });
        if (loginFailed) {
            res.statusCode = 401;
            res.json({
                status: auth.STATUS_ERROR,
                error: err,
                dataServices: results
            });
            return;
        }
        res.json({
            status: auth.STATUS_SUCCESS,
            dataServices: results
        });
    });
});

router.post('/logout', function (req, res, next) {
    DataServicesManager.getServices().forEach(function(dataService) {
        dataService.unauthorize(req);
    });
    req.session.destroy();
    res.json({
        status: 'success'
    });
});

router.get('/verify', function (req, res, next) {
    // todo: don't rely on service provider, implement internal simple user.
    if (!req.session.jiraToken) {
        res.statusCode = 401;
    }
    res.end();
});

module.exports = router;
