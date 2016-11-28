var models = require('./models');
var routes = require('./routes');

/**
 * Setup component.
 * @param {Function} app Express App.
 * @param {Object}   env Environment variables.
 */
module.exports.setup = function(app, env) {
    app.use('/api', routes);
};

module.exports.models = models;