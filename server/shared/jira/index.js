var ApiProxyRegistry = require('shared/api-proxy-manager').proxyRegistry;
var DataServicesManager = require('shared/data-services-manager').manager;
var proxyRouter = require('./api-proxy-route');
var ApiProxy = require('./api-proxy');
var DataService = require('./data-service');
var fs = require('fs');

/**
 * Setup component.
 * @param {Function} app Express App.
 * @param {Object}   env Environment variables.
 */
module.exports.setup = function(app, env) {

    var jiraUrl = env.JIRA_URL;
    var jiraApiVersion = env.JIRA_API_VERSION;
    var jiraAuthVersion = env.JIRA_AUTH_VERSION;
    var useStrictSsl = env.JIRA_API_PROXY_USE_STRICT_SSL === 'yes';
    var debugMode = env.JIRA_API_PROXY_DEBUG_MODE === 'yes';
    var jiraOauthConfig = {
        consumer_key: env.JIRA_OAUTH_CONSUMER_KEY,
        consumer_secret: fs.readFileSync(env.JIRA_OAUTH_CONSUMER_SECRET_PATH, 'utf8'),
    };

    var proxyMountPath = '/api/proxy/jira';

    var jiraApiProxyRegistry = new ApiProxyRegistry(function() {
        var instance = new ApiProxy(jiraUrl, proxyMountPath, jiraApiVersion, jiraAuthVersion, jiraOauthConfig);
        instance.setStrictSSL(useStrictSsl);
        instance.setDebugMode(debugMode);
        return instance;
    });
    DataServicesManager.register(new DataService(jiraApiProxyRegistry));
    app.use(proxyMountPath, proxyRouter);
};

module.exports.ApiProxy = ApiProxy;
module.exports.dataService = DataService;
