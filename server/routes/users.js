var express = require('express');
var async = require('async');
var user = require('../services/user');
var router = express.Router();

/**
 * GET list of users.
 */
router.get('/', function(req, res, next) {
    res.render('users/list', {title: 'Users'});
});

/**
 * GET information about user.
 */
router.get('/:username', function(req, res, next) {

    var periodInDays = req.query.period || 7;
    var periodStartDate = getPeriodStartDate(periodInDays);

    var userService = user.ServiceFactory(req.app.get('jira'), req.app.get('fecru'));

    userService.getDetails(req.params.username, function (err, user) {
        if (err) {
            next(err);
            return;
        }

        async.parallel({
            jiraComments: function (callback) {
                userService.getJiraComments(req.params.username, periodStartDate, function (err, result) {
                    if (err) {
                        callback(err);
                        return;
                    }
                    callback(null, result);
                });
            },
            fecruComments: function (callback) {
                userService.getFecruComments(req.params.username, periodStartDate, function (err, result) {
                    if (err) {
                        callback(err);
                        return;
                    }
                    callback(null, result);
                });
            }
        },
        function(err, results) {
            if (err) {
                return next({message: err});
            }

            results.user = user;
            results.md = require("markdown").markdown.toHTML;
            results.period = periodInDays;
            res.render('users/user', results);
        });
    });

});

module.exports = router;

function getPeriodStartDate(periodInDays) {
    var periodStart = new Date();
    periodStart.setDate(periodStart.getDate() - periodInDays);
    return periodStart;
}