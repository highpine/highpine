var jira = require('../lib/jira');

module.exports = function(jiraUrl, user, password, apiVersion) {
    var urlParts = url.parse(jiraUrl);
    var jiraClient = new jira.JiraApi(
        urlParts.protocol.replace(':', ''),
        urlParts.hostname,
        urlParts.port,
        user, password,
        apiVersion || 'latest',
        null,
        false
    );
    jiraClient.authorize(null, null, function() {});
    return {
        client: jiraClient
    };
};