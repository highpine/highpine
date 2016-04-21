/**
 * Jira REST API Client.
 *
 * - api/2/permission
 * - api/2/mypermissions
 * - api/2/application-properties
 * - api/2/applicationrole
 * - api/2/attachment
 * - api/2/auditing
 * - api/2/avatar
 * - api/2/comment/{commentId}/properties
 * - api/2/component
 * - api/2/configuration
 * - api/2/customFieldOption
 * - api/2/dashboard
 * - api/2/dashboard/{dashboardId}/items/{itemId}/properties
 * - api/2/field
 * - api/2/filter
 * - api/2/group
 * - api/2/groups
 * - api/2/groupuserpicker
 * - api/2/issue
 * - api/2/issue/{issueIdOrKey}/attachments
 * - api/2/issue/{issueIdOrKey}/properties
 * - api/2/issueLink
 * - api/2/issueLinkType
 * - api/2/issuesecurityschemes
 * - api/2/issuetype
 * - api/2/issuetype/{issueTypeId}/properties
 * - api/2/jql/autocompletedata
 * - api/2/licenseValidator
 * - api/2/mypreferences
 * - api/2/myself
 * - api/2/notificationscheme
 * - api/2/password
 * - api/2/permissionscheme
 * - api/2/priority
 * - api/2/project
 * - api/2/project/{projectIdOrKey}/properties
 * - api/2/project/{projectIdOrKey}/role
 * - api/2/project/{projectKeyOrId}/issuesecuritylevelscheme
 * - api/2/project/{projectKeyOrId}/notificationscheme
 * - api/2/project/{projectKeyOrId}/permissionscheme
 * - api/2/project/{projectKeyOrId}/securitylevel
 * - api/2/project/type
 * - api/2/projectCategory
 * - api/2/projectvalidate
 * - api/2/reindex
 * - api/2/reindex/request
 * - api/2/resolution
 * - api/2/role
 * - api/2/screens
 * - api/2/search
 * - api/2/securitylevel
 * - api/2/serverInfo
 * - api/2/settings
 * - api/2/status
 * - api/2/statuscategory
 * - api/2/universal_avatar
 * - api/2/upgrade
 * - api/2/user                         get user only
 * - api/2/user/properties
 * - api/2/version
 * - api/2/workflow
 * - api/2/workflowscheme
 * - api/2/worklog
 * - auth/1/session                     done
 * - auth/1/websudo
 *
 * @author Max Gopey <mgopey@gmail.com>
 * @license MIT
 */
var url = require('url');
var querystring = require('querystring');

var JiraApiClient = function (serviceUrl, username, password, apiVersion) {
    this.serviceUrl = serviceUrl;
    this.urlOptions = url.parse(serviceUrl);

    this.username = username;
    this.password = password;
    this.apiVersion = apiVersion || 'latest';
    this.strictSSL = true;

    var request = require('request');

    var userToken;

    var servicePathsMap = {
        api: '/rest/api',
        auth: '/rest/auth'
    };

    this.makeUrl = function(service, pathname, queryParams) {
        if (queryParams !== undefined && queryParams !== null) {
            pathname += (pathname.indexOf('?') >= 0 ? '&' : '?') +
                querystring.stringify(queryParams);
        }
        var uri = url.format({
            protocol: this.urlOptions.protocol,
            hostname: this.urlOptions.hostname,
            port: this.urlOptions.port,
            pathname: servicePathsMap[service] + '/' + this.apiVersion + pathname
        });
        return decodeURIComponent(uri);
    };

    this.proxyUrl = function(pathname, queryParams) {
        return this.makeUrl('api', pathname, queryParams);
    };
    this.getAuthUrl = function(pathname, queryParams) {
        return this.makeUrl('auth', pathname, queryParams);
    };

    this.request = function(options, callback) {

        options.rejectUnauthorized = this.strictSSL;

        options.headers = options.headers || {};
        options.headers.Accept = 'application/json';
        if (userToken) {
            options.headers.cookie = userToken.name + '=' + userToken.value;
        }

        console.log('Requesting:', options);
        request(options, callback);
    };
    this.get = function(url, callback) {
        this.request({method: 'GET', uri: url}, callback);
    };
    this.delete = function(url, callback) {
        this.request({method: 'DELETE', uri: url}, callback);
    };
    this.post = function(url, data, callback) {
        this.request({method: 'POST', uri: url, json: true, body: data}, callback);
    };
    this.put = function(url, data, callback) {
        this.request({method: 'PUT', uri: url, json: true, body: data}, callback);
    };

    this.setStrictSSL = function(strictSSL) {
        this.strictSSL = !!strictSSL;
    };

    this.setUserToken = function(token) {
        userToken = token;
    };
};

(function() {

    /**
     * @param {Function} callback
     * @returns {Function}
     */
    function responseHandleFactory(callback) {
        return function(error, response, body) {

            var newError;
            if (error) {
                callback(error, null);
                return;
            }

            if (response.statusCode === 404) {
                newError = new Error('Resource not found.');
                newError.status = 404;
                callback(newError);
                return;
            }

            if ([200, 201, 202, 203, 204].indexOf(response.statusCode) === -1) {
                newError = new Error(response.statusCode + ': Unable to connect to Jira.');
                newError.status = response.statusCode;
                callback(newError);
                return;
            }

            if (response.statusCode === 200) {
                body = typeof body == 'object' ? body : JSON.parse(body);
            } else {
                body = null;
            }
            callback(null, body);
        };
    }

    /**
     * Creates a new session for a user in JIRA.
     * @url https://docs.atlassian.com/jira/REST/latest/#auth/1/session-login
     *
     * @param {String|Function} username
     * @param {String} password
     * @param {Function} callback
     */
    this.getToken = function(username, password, callback) {
        if (typeof username == 'function') {
            callback = username;
        } else {
            this.username = username || this.username;
            this.password = password || this.password;
        }
        var authData = {
            username: this.username,
            password: this.password
        };
        this.post(this.getAuthUrl('/session'), authData, responseHandleFactory(callback));
    };
    this.login = this.getToken;

    /**
     * Logs the current user out of JIRA, destroying the existing session, if any.
     * @url https://docs.atlassian.com/jira/REST/latest/#auth/1/session-logout
     *
     * @param {Function} callback
     */
    this.logout = function(callback) {
        this.delete(this.getAuthUrl('/session'), responseHandleFactory(callback));
    };

    /**
     * Get information about the currently authenticated user's session.
     * @url https://docs.atlassian.com/jira/REST/latest/#auth/1/session-currentUser
     *
     * @param {Function} callback
     */
    this.getSessionInfo = function(callback) {
        this.get(this.getAuthUrl('/session'), responseHandleFactory(callback));
    };

    /**
     * Retrieve the user authentication token and store it to pass with further requests.
     *
     * @param {String} username
     * @param {String} password
     * @param {Function} callback
     */
    this.authorize = function(username, password, callback) {
        this.getToken(username, password, (function(client) {
            return function(err, result) {
                if (result && result.session) {
                    client.setUserToken(result.session);
                }
                callback(err, result);
            };
        })(this));
    };

    /**
     * Searches for issues using JQL.
     * @url https://docs.atlassian.com/jira/REST/latest/#api/2/search-search
     *
     * @param {String}  jql
     * @param {Object} options
     * @param {Function} callback
     */
    this.search = function(jql, options, callback) {
        var searchParams = {
            jql: jql,
            startAt: options.startAt || 0,
            maxResults: options.maxResults || 50,
            validateQuery: options.validateQuery || true,
            fields: options.fields || '*navigable',
            expand: options.expand || ''
        };
        if (options.method === 'post') {
            this.post(this.proxyUrl('/search'), searchParams, responseHandleFactory(callback));
        } else {
            this.get(this.proxyUrl('/search', searchParams), responseHandleFactory(callback));
        }
    };

    /**
     * Get user by username.
     * @url https://docs.atlassian.com/jira/REST/latest/#api/2/user-getUser
     *
     * @param username
     * @param callback
     */
    this.getUser = function(username, callback) {
        username = typeof username == 'string' ? {username: username} : username;
        this.get(this.proxyUrl('/user', username), responseHandleFactory(callback));
    }

}).call(JiraApiClient.prototype);

module.exports.JiraApiClient = JiraApiClient;