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
let GitlabApiProxy = require('./api-proxy');
let GitlabDataService = require('./data-service');

/**
 * Setup component.
 * @param {Function} app Express App.
 * @param {Object}   env Environment variables.
 */
module.exports.setup = function(app, env) {

    const proxyMountPath = '/api/proxy/gitlab';

    app.use(proxyMountPath, proxyRouter);

    const gitlabUrl        = env.GITLAB_URL;
    const gitlabApiVersion = env.GITLAB_API_VERSION;
    const useStrictSsl     = env.GITLAB_API_PROXY_USE_STRICT_SSL === 'yes';
    const debugMode        = env.GITLAB_API_PROXY_DEBUG_MODE === 'yes';

    let gitlabProxyFactory = function(token) {
        let instance = new GitlabApiProxy(gitlabUrl, proxyMountPath, gitlabApiVersion);
        instance.setStrictSSL(useStrictSsl);
        instance.setDebugMode(debugMode);
        if (token) {
            instance.setUserToken(token);
        }
        return instance;
    };

    let gitlabApiProxyRegistry = new ApiProxyRegistry(gitlabProxyFactory);
    DataServicesRegistry.register(new GitlabDataService(gitlabApiProxyRegistry));
};

module.exports.GitlabApiProxy = GitlabApiProxy;
module.exports.GitlabDataService = GitlabDataService;
