var proxyRegistry = require('./api-proxy-registry');
var AbstractApiProxy = require('./abstract-api-proxy');

/**
 * Setup component.
 * @param {Function} app Express App.
 * @param {Object}   env Environment variables.
 */
module.exports.setup = function(app, env) {

};

module.exports.AbstractApiProxy = AbstractApiProxy;
module.exports.proxyRegistry = proxyRegistry;
