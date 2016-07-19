var auth = require('./auth');
var routes = require('./routes');

/**
 * Setup component.
 * @param {Function} app Express App.
 * @param {Object}   env Environment variables.
 */
module.exports.setup = function(app, env) {
    app.use('/auth', routes);
};

module.exports.auth = auth;
module.exports.STATUS_SUCCESS = auth.STATUS_SUCCESS;
module.exports.STATUS_ERROR = auth.STATUS_ERROR;