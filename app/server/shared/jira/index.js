/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

let ApiProxyRegistry = require('shared/api-proxy-manager').ApiProxyRegistry;
let DataServicesRegistry = require('shared/data-services-manager').registry;
let proxyRouter = require('./api-proxy-route');
let JiraApiProxy = require('./api-proxy');
let JiraDataService = require('./data-service');
let fs = require('fs');

/**
 * Setup component.
 * @param {Function} app Express App.
 * @param {Object}   env Environment variables.
 */
module.exports.setup = function(app, env) {

    const proxyMountPath = '/api/proxy/jira';

    app.use(proxyMountPath, proxyRouter);

    const jiraUrl         = env.JIRA_URL;
    const jiraApiVersion  = env.JIRA_API_VERSION;
    const jiraAuthVersion = env.JIRA_AUTH_VERSION;
    const useStrictSsl    = env.JIRA_API_PROXY_USE_STRICT_SSL === 'yes';
    const debugMode       = env.JIRA_API_PROXY_DEBUG_MODE === 'yes';
    const jiraOauthConfig = {
        consumer_key: env.JIRA_OAUTH_CONSUMER_KEY,
        consumer_secret: fs.readFileSync(env.JIRA_OAUTH_CONSUMER_SECRET_PATH, 'utf8'),
    };

    let jiraApiProxyFactory = function(token = null) {
        let instance = new JiraApiProxy(jiraUrl, proxyMountPath, jiraApiVersion, jiraAuthVersion, jiraOauthConfig);
        instance.setStrictSSL(useStrictSsl);
        instance.setDebugMode(debugMode);
        if (token) {
            instance.setUserToken(token);
        }
        return instance;
    };
    let jiraApiProxyRegistry = new ApiProxyRegistry(jiraApiProxyFactory);

    DataServicesRegistry.register(new JiraDataService(jiraApiProxyRegistry));
};

module.exports.JiraApiProxy = JiraApiProxy;
module.exports.JiraDataService = JiraDataService;
