/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

let OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
let DataServicesRegistry = require('shared/data-services-manager').registry;
let BadResponseError = require('shared/api-client').BadResponseError;
let Person = require('shared/person').models.Person;

let GitlabDataService = DataServicesRegistry.get('gitlab');

class GitlabOauth2Strategy extends OAuth2Strategy {
    tokenParams(options) {
        // Gitlab requires 'redirect_uri' parameter also for requesting access token.
        // @see: https://docs.gitlab.com/ee/api/oauth2.html#2-requesting-access-token
        return {
            'redirect_uri': options.callbackURL
        };
    };
}

function loadCurrentGitlabUser(authorizedProxy, callback) {
    return authorizedProxy.request({
        url: authorizedProxy.proxyUrl('/user'),
        json: true
    }, callback);
}

function findPersonByUsername(username, callback) {
    return Person.findByUsername(username, callback);
}

function createPersonFromGitlabUser(gitlabUser) {
    return new Person({
        full_name: gitlabUser.name,
        email: gitlabUser.email,
        username: gitlabUser.username,
        avatar: gitlabUser.avatar_url
    });
}

module.exports = function(gitlabBaseUrl, clientId, clientSecret) {
    return new GitlabOauth2Strategy({
            authorizationURL: gitlabBaseUrl + '/oauth/authorize',
            tokenURL: gitlabBaseUrl + '/oauth/token',
            clientID: clientId,
            clientSecret: clientSecret,
            callbackURL: '' // set dynamically with the request.
        },
        function (accessToken, refreshToken, profile, done) {
            let token = {
                type: 'oauth2',
                accessToken: accessToken,
                refreshToken: refreshToken
            };
            let gitlabProxyRegistry = GitlabDataService.getProxyRegistry();
            gitlabProxyRegistry.registerToken(token);

            loadCurrentGitlabUser(gitlabProxyRegistry.withToken(token), function(error, response, user) {
                if (error) {
                    return done(error);
                }

                if (response.statusCode !== 200) {
                    return done(BadResponseError.withStatusCode(
                        response.statusCode, 'Failed retrieving logged in user information.'));
                }

                findPersonByUsername(user.username, function(err, person) {
                    if (err) {
                        return done(err);
                    }

                    if (!person) {
                        person = createPersonFromGitlabUser(user);
                    }

                    person.set('auth_tokens.gitlab', token);
                    person.save();

                    return done(null, person);
                });
            });
        }
    );
};
