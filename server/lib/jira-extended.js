var jira = require('jira');
var url = require('url');
var querystring = require('querystring');

(function() {
    jira.JiraApi.doRequest = function(options, callback) {
        if(oauth && oauth.consumer_key && oauth.consumer_secret) {
            options.oauth = {
                consumer_key: oauth.consumer_key,
                consumer_secret: oauth.consumer_secret,
                token: oauth.access_token,
                token_secret: oauth.access_token_secret
            };
        } else if (this.sessionID) {
            options.headers.cookie = this.sessionID.name + '=' + this.sessionID.value;
        } else {
            options.auth = {
                'user': this.username,
                'pass': this.password
            };
        }
        console.log(options);
        this.request(options, callback);
    };
})();

(function() {


    this.setSessionId = function(sessionId)
    {
        this.sessionID = sessionId;
    };

    this.startSession = function(username, password, callback) {

        this.username = username || this.username;
        this.password = password || this.password;

        var options = {
            rejectUnauthorized: this.strictSSL,
            uri: this.makeUri('/session', 'rest/auth/', '1'),
            method: 'POST',
            json: true,
            body: {
                username: this.username,
                password: this.password
            }
        };

        this.doRequest(options, function(error, response, body) {
            var newError;
            if (error) {
                callback(error, null);
                return;
            }

            if (response.statusCode === 401 || response.statusCode === 403) {
                newError = new Error('Authorization to Jira failed.');
                newError.status = response.statusCode;
                callback(newError);
                return;
            }

            if (response.statusCode !== 200) {
                newError = new Error(response.statusCode + ': Unable to connect to JIRA.');
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

            callback(null, body);

        });
    };

    /**
     * Retrieve the user authentication token and store it to pass with further requests.
     *
     * @param {String} username
     * @param {String} password
     * @param {Function} callback
     */
    this.authorize = function(username, password, callback) {
        this.startSession(username, password, (function(client) {
            return function(err, result) {
                if (result && result.session) {
                    client.setSessionId(result.session);
                }
                callback(err, result);
            };
        })(this));
    };

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