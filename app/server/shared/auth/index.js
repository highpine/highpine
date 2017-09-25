var auth = require('./auth');
var routes = require('./routes');
var passportLocalStrategy = require('./passport-strategy-local');
var passport = require('passport');
var Person = require('shared/person').models.Person;

/**
 * Setup component.
 * @param {Function} app Express App.
 * @param {Object}   env Environment variables.
 */
module.exports.setup = function(app, env) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(userId, done) {
        Person.findById(userId, done);
    });
    passport.use(passportLocalStrategy);
    app.use('/auth', routes);
};

module.exports.auth = auth;
module.exports.localStrategy = passportLocalStrategy;
module.exports.STATUS_SUCCESS = auth.STATUS_SUCCESS;
module.exports.STATUS_ERROR = auth.STATUS_ERROR;