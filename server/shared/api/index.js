var Auth = require('shared/auth');
var helper = require('./helper');
var ApiError = require('./error');
var ApiResource = require('./resource');

/**
 * Setup component.
 * @param {Function} app Express App.
 * @param {Object}   env Environment variables.
 */
module.exports.setup = function(app, env) {
    // app.use('/api', Auth.auth.authorizationChecker);

    // todo: subscribe to 'components-setup' event and add common API error handlers.
};

module.exports.helper = helper;
module.exports.ApiError = ApiError;
module.exports.ApiResource = ApiResource;