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
let querystring = require('querystring');

class FecruTokenStrategy extends LocalStrategy {
    constructor(options, verify) {
        super(options, verify);
        this.name = 'fecru-token';
    }
}

function getFecruProxyRegistry() {
    let fecruDataService = DataServicesRegistry.get('fecru');
    return fecruDataService.getProxyRegistry();
}

function authorize(username, password, callback) {
    let fecruProxyRegistry = getFecruProxyRegistry();
    let anonymousProxy = fecruProxyRegistry.anonymous();
    let options = {
        url: anonymousProxy.proxyUrl('/rest-service-fecru/auth/login'),
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true,
        body: querystring.stringify({
            userName: username,
            password: password
        })
    };
    anonymousProxy.request(options, function (error, apiResponse, body) {
        if (error) {
            return callback(error);
        }
        if (apiResponse.statusCode !== 200 || !body.token) {
            let error = new Error(
                body.error || 'Fecru authorization failed.'
            );
            error.statusCode = apiResponse.statusCode;
            error.responseBody = body;
            callback(error);
            return;
        }

        callback(null, {
            token: body.token
        });
    });
}

function loadCurrentFecruUser(authorizedProxy, username, callback) {
    return authorizedProxy.request({
        url: authorizedProxy.proxyUrl('/rest-service/users-v1/' + username),
        json: true
    }, callback);
}

function findPersonByUsername(username, callback) {
    return Person.findByUsername(username, callback);
}

function createPersonFromFecruUser(fecruUser) {
    return new Person({
        full_name: fecruUser.userData.displayName,
        email: fecruUser.email,
        username: fecruUser.userData.userName,
        avatar: fecruUser.avatarUrl ? fecruUser.avatarUrl : null
    });
}

module.exports = new FecruTokenStrategy(function(username, password, done) {
    authorize(username, password, function (error, result) {
        if (error) {
            return done(error);
        }

        let token = {
            type: 'token',
            token: result.token
        };

        let fecruProxyRegistry = getFecruProxyRegistry();
        fecruProxyRegistry.registerToken(token);

        let proxy = fecruProxyRegistry.withToken(token);
        loadCurrentFecruUser(proxy, username, function(error, response, user) {
            if (error) {
                return done(error);
            }
            if (response.statusCode !== 200) {
                return done(BadResponseError.withStatusCode(
                    response.statusCode, 'Failed retrieving logged in user information.'));
            }
            findPersonByUsername(user.userData.userName, function(err, person) {
                if (err) {
                    return done(err);
                }
                if (!person) {
                    person = createPersonFromFecruUser(user);
                }
                person.set('password', password);
                person.set('account_completed', true);
                person.set('auth_tokens.fecru', token);
                person.save();
                return done(null, person);
            });
        });
    });
});