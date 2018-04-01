/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

let OAuthStrategy = require('passport-oauth').OAuthStrategy;
let DataServicesRegistry = require('shared/data-services-manager').registry;
let BadResponseError = require('shared/api-client').BadResponseError;
let Person = require('shared/person').models.Person;

let JiraDataService = DataServicesRegistry.get('jira');

function loadCurrentJiraUser(authorizedProxy, callback) {
    return authorizedProxy.request({
        url: authorizedProxy.proxyUrl('/myself'),
        json: true
    }, callback);
}

function findPersonByUsername(username, callback) {
    return Person.findByUsername(username, callback);
}

function createPersonFromJiraUser(jiraUser) {
    return new Person({
        full_name: jiraUser.displayName,
        email: jiraUser.email,
        username: jiraUser.name,
        avatar: jiraUser.avatarUrls ? jiraUser.avatarUrls['48x48'] : null
    });
}

module.exports = function(jiraBaseUrl, consumerKey, consumerSecret) {
    return new OAuthStrategy({
            consumerKey: consumerKey,
            consumerSecret: consumerSecret,
            signatureMethod: 'RSA-SHA1',
            requestTokenURL: jiraBaseUrl + '/plugins/servlet/oauth/request-token',
            accessTokenURL: jiraBaseUrl + '/plugins/servlet/oauth/access-token',
            userAuthorizationURL: jiraBaseUrl + '/plugins/servlet/oauth/authorize',
            callbackURL: '' // set dynamically with the request.
        },
        function (accessToken, accessTokenSecret, profile, done) {
            let token = {
                type: 'oauth',
                accessToken: accessToken,
                accessTokenSecret: accessTokenSecret
            };
            let jiraProxyRegistry = JiraDataService.getProxyRegistry();
            jiraProxyRegistry.registerToken(token);

            loadCurrentJiraUser(jiraProxyRegistry.withToken(token), function(error, response, user) {
                if (error) {
                    return done(error);
                }
                if (response.statusCode !== 200) {
                    return done(BadResponseError.withStatusCode(
                        response.statusCode, 'Failed retrieving logged in user information.'));
                }
                findPersonByUsername(user.name, function(err, person) {
                    if (err) {
                        return done(err);
                    }
                    if (!person) {
                        person = createPersonFromJiraUser(user);
                        person.set('account_completed', false);
                    }
                    person.set('auth_tokens.jira', token);
                    person.save();
                    return done(null, person);
                });
            });
        }
    );
};