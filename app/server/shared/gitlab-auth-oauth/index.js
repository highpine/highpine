/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

let passport = require('passport');
let routes = require('./routes');
let gitlabOauth2PassportStrategyFactory = require('./passport-strategy-factory');

/**
 * Setup component.
 * @param {Function} app Express App.
 * @param {Object}   env Environment variables.
 */
module.exports.setup = function(app, env) {
    app.use('/gitlab-auth', routes);

    const jiraBaseUrl = env.GITLAB_URL;
    const clientId = env.GITLAB_OAUTH_CLIENT_ID;
    const clientSecret = env.GITLAB_OAUTH_CLIENT_SECRET;

    passport.use(
        'gitlab-oauth2',
        gitlabOauth2PassportStrategyFactory(jiraBaseUrl, clientId, clientSecret)
    );
};