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
let FecruApiProxy = require('./api-proxy');
let FecruDataService = require('./data-service');

/**
 * Setup component.
 * @param {Function} app Express App.
 * @param {Object}   env Environment variables.
 */
module.exports.setup = function(app, env) {

    let proxyMountPath = '/api/proxy/fecru';

    let fecruUrl        = env.FECRU_URL;
    let fecruApiVersion = env.FECRU_API_VERSION;
    let useStrictSsl    = env.FECRU_API_PROXY_USE_STRICT_SSL === 'yes';
    let debugMode       = env.FECRU_API_PROXY_DEBUG_MODE === 'yes';

    let fecruProxyFactory = function() {
        let instance = new FecruApiProxy(fecruUrl, proxyMountPath, fecruApiVersion);
        instance.setStrictSSL(useStrictSsl);
        instance.setDebugMode(debugMode);
        return instance;
    };
    let fecruApiProxyRegistry = new ApiProxyRegistry(fecruProxyFactory);

    DataServicesRegistry.register(new FecruDataService(fecruApiProxyRegistry));

    app.use(proxyMountPath, proxyRouter);
};

module.exports.FecruApiProxy = FecruApiProxy;
module.exports.FecruDataService = FecruDataService;
