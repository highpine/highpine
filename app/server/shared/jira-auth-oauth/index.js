/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

let passport = require('passport');
let fs = require('fs');
let routes = require('./routes');
let jiraOauthPassportStrategyFactory = require('./passport-strategy-factory');

/**
 * Setup component.
 * @param {Function} app Express App.
 * @param {Object}   env Environment variables.
 */
module.exports.setup = function(app, env) {
    app.use('/jira-auth', routes);

    let jiraBaseUrl = env.JIRA_URL;
    let consumerKey = env.JIRA_OAUTH_CONSUMER_KEY;
    // See: https://developer.atlassian.com/server/jira/platform/oauth/#JIRARESTAPIExample-OAuthauthentication-step1Step1:ConfiguringJIRA
    let consumerSecret = fs.readFileSync(env.JIRA_OAUTH_CONSUMER_SECRET_PATH, 'utf8');

    passport.use(
        'jira-oauth',
        jiraOauthPassportStrategyFactory(jiraBaseUrl, consumerKey, consumerSecret)
    );
};