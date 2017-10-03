/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

let express = require('express');
let router = express.Router();
let passport = require('passport');

router.get('/oauth', function(req, res, next) {
    let callbackUrl = req.protocol + '://' + req.get('host') + '/jira-auth/oauth/callback' +
        '?redirect=' + (req.query.redirect || '');
    passport.authenticate('oauth', { callbackURL: callbackUrl })(req, res, next);
});

router.get('/oauth/callback', function(req, res, next) {
    let redirectTo = (req.query.redirect || '/');
    passport.authenticate('oauth', function(err, user) {
        if (err || !user) {
            return res.redirect(302, redirectTo);
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            res.redirect(302, redirectTo);
        });
    })(req, res, next);
});

module.exports = router;
