var helper = require('./helper');
var BadResponseError = require('./bad-response-error');

/**
 * Setup component.
 * @param {Function} app Express App.
 * @param {Object}   env Environment variables.
 */
module.exports.setup = function(app, env) {
};

module.exports.helper = helper;
module.exports.BadResponseError = BadResponseError;