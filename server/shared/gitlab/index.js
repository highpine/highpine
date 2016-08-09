var ApiProxyManager = require('shared/api-proxy-manager');
var DataServicesManager = require('shared/data-services-manager').manager;
var proxyRouter = require('./api-proxy-router');
var ApiProxy = require('./api-proxy');
var dataService = require('./data-service');

/**
 * Setup component.
 * @param {Function} app Express App.
 * @param {Object}   env Environment variables.
 */
module.exports.setup = function(app, env) {

    var gitlabUrl = env.GITLAB_URL;
    var gitlabApiVersion = env.GITLAB_API_VERSION;
    var useStrictSsl = env.GITLAB_API_PROXY_USE_STRICT_SSL == 'yes';
    var debugMode = env.GITLAB_API_PROXY_DEBUG_MODE == 'yes';

    var proxyMountPath = '/api/proxy/gitlab';

    app.set('gitlab-proxy-registry', new ApiProxyManager.proxyRegistry(function() {
        var instance = new ApiProxy(
            gitlabUrl, proxyMountPath, gitlabApiVersion
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
