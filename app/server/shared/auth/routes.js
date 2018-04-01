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

router.post('/login', function(req, res, next) {
    passport.authenticate(req.body.strategy || 'local', function(err, user) {
        if (err || !user) {
            let errorResponse = { err: err };
            if (err.message) {
                errorResponse.message = err.message;
            }
            res.statusCode = 401;
            res.json(errorResponse);
            return;
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            res.json(user.toObject());
        });
    })(req, res, next);
});

router.post('/logout', function (req, res, next) {
    req.session.regenerate(err => {
        if (err) {
            return next(err);
        }
        res.json({
            status: 'success'
        });
    });
});


router.get('/verify', function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.statusCode = 401;
        res.end();
        return;
    }
    res.json(req.user.toObject());
});

module.exports = router;
