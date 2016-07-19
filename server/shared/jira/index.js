var ApiProxyManager = require('shared/api-proxy-manager');
var DataServicesManager = require('shared/data-services-manager').manager;
var proxyRouter = require('./api-proxy-route');
var ApiProxy = require('./api-proxy');
var dataService = require('./data-service');


/**
 * Setup component.
 * @param {Function} app Express App.
 * @param {Object}   env Environment variables.
 */
module.exports.setup = function(app, env) {

    var jiraUrl = env.JIRA_URL;
    var jiraApiVersion = env.JIRA_API_VERSION;
    var jiraAuthVersion = env.JIRA_AUTH_VERSION;
    var useStrictSsl = env.JIRA_API_PROXY_USE_STRICT_SSL;
    var debugMode = env.JIRA_API_PROXY_DEBUG_MODE;

    var proxyMountPath = '/api/proxy/jira';

    app.set('jira-proxy-registry', new ApiProxyManager.proxyRegistry(function() {
        var instance = new ApiProxy(
            jiraUrl, proxyMountPath, jiraApiVersion, jiraAuthVersion
        );
        instance.setStrictSSL(useStrictSsl);
        instance.setDebugMode(debugMode);
        return instance;
    }));

    app.use(proxyMountPath, proxyRouter);

    DataServicesManager.register(dataService);
};

module.exports.ApiProxy = ApiProxy;
module.exports.dataService = dataService;
