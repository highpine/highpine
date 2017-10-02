/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

let errorHandler = require('./error-handler');
let ApiError = require('./api-error');
let ApiResource = require('./resource');
let BasicApiModel = require('./basic-api-model');
// let passport = require('passport');

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

module.exports.ApiError = ApiError;
module.exports.ApiResource = ApiResource;
module.exports.BasicApiModel = BasicApiModel;