var helper = require('./helper');
var errorHandler = require('./error-handler');
var ApiError = require('./api-error');
var ApiResource = require('./resource');
var passport = require('passport');

/**
 * Setup component.
 * @param {Function} app Express App.
 * @param {Object}   env Environment variables.
 */
module.exports.setup = function(app, env) {
    // todo: switch to passport usage.
    // app.use('/api', Auth.auth.authorizationChecker);
    // app.use('/api', passport.authenticate('local'));
    app.use('/api', function(req, res, next) {
        if (req.isUnauthenticated()) {
            return next(ApiError.withStatusCode(401, "You should be authenticated to use the API"));
        }
        return next();
    });
    app.get('eventEmitter').on('shared-components-setup', () => {
        app.use(errorHandler(app.get('env')));
    });
};

module.exports.helper = helper;
module.exports.ApiError = ApiError;
module.exports.ApiResource = ApiResource;