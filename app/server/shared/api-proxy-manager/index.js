/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

let ApiProxyRegistry = require('./api-proxy-registry');
let AbstractApiProxy = require('./abstract-api-proxy');

/**
 * Setup component.
 * @param {Function} app Express App.
 * @param {Object}   env Environment variables.
 */
module.exports.setup = function(app, env) {
    // nothing to setup.
};

module.exports.AbstractApiProxy = AbstractApiProxy;
module.exports.ApiProxyRegistry = ApiProxyRegistry;
