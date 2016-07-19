var ApiProxyManager = require('shared/api-proxy-manager');
var DataServicesManager = require('shared/data-services-manager').manager;
var ApiProxy = require('./api-proxy');
var proxyRouter = require('./api-proxy-route');
//var dataService = require('./data-service');
var dataService = require('./data-service-deprecated');

/**
 * Setup component.
 * @param {Function} app Express App.
 * @param {Object}   env Environment variables.
 */
module.exports.setup = function(app, env) {

    var fecruUrl = env.FECRU_URL;
    var fecruApiVersion = env.FECRU_API_VERSION;
    var useStrictSsl = env.FECRU_API_PROXY_USE_STRICT_SSL;
    var debugMode = env.FECRU_API_PROXY_DEBUG_MODE;

    var proxyMountPath = '/api/proxy/fecru';

    app.set('fecru-proxy-registry', new ApiProxyManager.proxyRegistry(function() {
        var instance = new ApiProxy(
            fecruUrl, proxyMountPath, fecruApiVersion, ''
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
