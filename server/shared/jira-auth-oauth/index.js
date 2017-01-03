let passportStrategyJiraOauthFactory = require('./passport-strategy-jira-oauth').OAuthStrategyFactory;
let passport = require('passport');
let routes = require('./routes');
let fs = require('fs');

/**
 * Setup component.
 * @param {Function} app Express App.
 * @param {Object}   env Environment variables.
 */
module.exports.setup = function(app, env) {
    app.use('/jira-auth', routes);
    let consumerKey = env.JIRA_OAUTH_CONSUMER_KEY;
    let consumerSecret = fs.readFileSync(env.JIRA_OAUTH_CONSUMER_SECRET_PATH, 'utf8');
    passport.use(passportStrategyJiraOauthFactory(env.JIRA_URL, consumerKey, consumerSecret));
};