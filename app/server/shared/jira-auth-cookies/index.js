let passportStrategyJiraCookies = require('./passport-strategy-jira-cookies');
let passport = require('passport');

/**
 * Setup component.
 * @param {Function} app Express App.
 * @param {Object}   env Environment variables.
 */
module.exports.setup = function(app, env) {
    passport.use(passportStrategyJiraCookies);
};