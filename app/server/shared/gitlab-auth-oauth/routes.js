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

function getRedirectUri(req) {
    return req.protocol + '://' + req.get('host') +
        '/gitlab-auth/oauth/callback' +
        '?redirect=' + (req.query.redirect || '')
}

router.get('/oauth', function(req, res, next) {
    passport.authenticate('gitlab-oauth2', { callbackURL: getRedirectUri(req) })(req, res, next);
});

router.get('/oauth/callback', function(req, res, next) {
    let redirectTo = (req.query.redirect || '/');
    passport.authenticate('gitlab-oauth2', { callbackURL: getRedirectUri(req) }, function(err, user) {
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
