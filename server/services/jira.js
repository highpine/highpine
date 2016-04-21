var jira = require('../lib/jira');
var url = require('url');

module.exports = function(jiraUrl, username, password, apiVersion) {
    var jiraClient = new jira.JiraApiClient(jiraUrl, username, password, apiVersion);
    jiraClient.setStrictSSL(false);
    // todo: remove the next line after the authorization will be implemented.
    jiraClient.authorize(null, null, function(err, result) {});
    return {
        client: jiraClient
    };
};