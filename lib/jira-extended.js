var jira = require('jira');
var url = require('url');
var querystring = require('querystring');

(function() {

    /**
     * Get a user in Jira.
     *
     * @param username
     * @param callback
     *
     * @link https://docs.atlassian.com/jira/REST/latest/#api/2/user-getUser
     */
    this.getUser = function(username, callback) {

        username = typeof username == 'string' ? {username: username} : username;

        var options = {
            rejectUnauthorized: this.strictSSL,
            uri: this.makeUri('/user?' + querystring.stringify(username)),
            method: 'GET'
        };

        this.doRequest(options, function(error, response, body) {

            var newError;
            if (error) {
                callback(error, null);
                return;
            }

            if (response.statusCode === 404) {
                newError = new Error('Requested user is not found.');
                newError.status = response.statusCode;
                callback(newError);
                return;
            }

            if (response.statusCode !== 200) {
                newError = new Error(response.statusCode + ': Unable to connect to JIRA during getUser.');
                newError.status = response.statusCode;
                callback(newError);
                return;
            }

            if (body === undefined) {
                newError = new Error('Response body was undefined.');
                newError.status = 500;
                callback(newError);
                return;
            }

            callback(null, JSON.parse(body));

        });
    };

    this.getComments = function(issueId, callback) {

        var options = {
            rejectUnauthorized: this.strictSSL,
            uri: this.makeUri('/issue/' + issueId + '/comment'),
            method: 'GET'
        };

        this.doRequest(options, function(error, response, body) {

            if (error) {
                callback(error, null);
                return;
            }

            if (response.statusCode === 404) {
                callback('Requested issue is not found.');
                return;
            }

            if (response.statusCode !== 200) {
                callback(response.statusCode + ': Unable to connect to JIRA during getComments.');
                return;
            }

            if (body === undefined) {
                callback('Response body was undefined.');
                return;
            }

            callback(null, JSON.parse(body));

        });
    };


}).call(jira.JiraApi.prototype);

exports.JiraApi = jira.JiraApi;