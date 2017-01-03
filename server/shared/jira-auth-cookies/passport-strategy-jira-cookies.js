let LocalStrategy = require('passport-local').Strategy;
let util = require('util');
let Person = require('shared/person').models.Person;
let DataServicesManager = require('shared/data-services-manager').manager;
let BadResponseError = require('shared/api-client').BadResponseError;

function JiraCookiesStrategy(options, verify) {
    LocalStrategy.call(this, options || {}, verify);
    this.name = 'jira-cookies';
}

util.inherits(JiraCookiesStrategy, LocalStrategy);

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
    let jira = DataServicesManager.getService('jira');
    jira.authorize(username, password, function (error, result) {
        if (error) {
            return done(error);
        }
        let token = result.token;
        token.type = 'cookies';
        let proxy = jira.getProxyRegistry().withToken(token);
        loadCurrentJiraUser(proxy, function(error, response, body) {
            if (error) {
                return done(error);
            }
            if (response.statusCode !== 200) {
                return done(BadResponseError.withStatusCode(
                    response.statusCode, 'Failed retrieving logged in user information.'));
            }
            findPersonByUsername(body.name, function(err, person) {
                if (err) {
                    return done(err);
                }
                if (!person) {
                    person = createPersonFromJiraUser(body);
                    person.set('password', password);
                }
                person.set('auth_tokens.jira', token);
                person.save();
                return done(null, person);
            });
        });
    });
});