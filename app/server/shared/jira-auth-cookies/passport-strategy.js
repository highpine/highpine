/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

let LocalStrategy = require('passport-local').Strategy;
let Person = require('shared/person').models.Person;
let DataServicesRegistry = require('shared/data-services-manager').registry;
let BadResponseError = require('shared/api-client').BadResponseError;

class JiraCookiesStrategy extends LocalStrategy {
    constructor(options, verify) {
        super(options, verify);
        this.name = 'jira-cookies';
    }
}

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

module.exports = new JiraCookiesStrategy(function(username, password, done) {
    let JiraDataService = DataServicesRegistry.get('jira');
    JiraDataService.authorize(username, password, function (error, result) {
        if (error) {
            return done(error);
        }
        let token = result.token;
        token.type = 'cookies';
        let jiraProxyRegistry = JiraDataService.getProxyRegistry();
        jiraProxyRegistry.registerToken(token);

        let proxy = jiraProxyRegistry.withToken(token);
        loadCurrentJiraUser(proxy, function(error, response, user) {
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
                }
                person.set('password', password);
                person.set('account_completed', true);
                person.set('auth_tokens.jira', token);
                person.save();
                return done(null, person);
            });
        });
    });
});