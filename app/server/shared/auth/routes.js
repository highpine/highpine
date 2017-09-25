let auth = require('./auth');
let express = require('express');
let router = express.Router();
let passport = require('passport');


router.post('/login', function(req, res, next) {
    passport.authenticate(req.body.strategy || 'local', function(err, user) {
        if (err || !user) {
            res.statusCode = 401;
            res.json({
                err: err
            });
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
    req.session.destroy();
    res.json({
        status: 'success'
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
