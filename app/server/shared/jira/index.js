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
let ApiProxy = require('./api-proxy');
let JiraDataService = require('./data-service');
let fs = require('fs');

/**
 * Setup component.
 * @param {Function} app Express App.
 * @param {Object}   env Environment variables.
 */
module.exports.setup = function(app, env) {

    let proxyMountPath = '/api/proxy/jira';

    let jiraUrl         = env.JIRA_URL;
    let jiraApiVersion  = env.JIRA_API_VERSION;
    let jiraAuthVersion = env.JIRA_AUTH_VERSION;
    let useStrictSsl    = env.JIRA_API_PROXY_USE_STRICT_SSL === 'yes';
    let debugMode       = env.JIRA_API_PROXY_DEBUG_MODE === 'yes';
    let jiraOauthConfig = {
        consumer_key: env.JIRA_OAUTH_CONSUMER_KEY,
        consumer_secret: fs.readFileSync(env.JIRA_OAUTH_CONSUMER_SECRET_PATH, 'utf8'),
    };

    let jiraApiProxyFactory = function() {
        let instance = new ApiProxy(jiraUrl, proxyMountPath, jiraApiVersion, jiraAuthVersion, jiraOauthConfig);
        instance.setStrictSSL(useStrictSsl);
        instance.setDebugMode(debugMode);
        return instance;
    };
    let jiraApiProxyRegistry = new ApiProxyRegistry(jiraApiProxyFactory);

    DataServicesRegistry.register(new JiraDataService(jiraApiProxyRegistry));

    app.use(proxyMountPath, proxyRouter);
};

module.exports.ApiProxy = ApiProxy;
module.exports.dataService = JiraDataService;
