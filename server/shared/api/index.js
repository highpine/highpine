var Auth = require('shared/auth');
var helper = require('./helper');
var errorHandler = require('./error-handler');
var ApiError = require('./error');
var ApiResource = require('./resource');

/**
 * Setup component.
 * @param {Function} app Express App.
 * @param {Object}   env Environment variables.
 */
module.exports.setup = function(app, env) {
    // app.use('/api', Auth.auth.authorizationChecker);
    app.get('eventEmitter').on('shared-components-setup', () => {
        app.use(errorHandler(app.get('env')));
    });
};

module.exports.helper = helper;
module.exports.ApiError = ApiError;
module.exports.ApiResource = ApiResource;