var models = require('./models');
var routers = require('./routers');

/**
 * Setup component.
 * @param {Function} app Express App.
 * @param {Object}   env Environment variables.
 */
module.exports.setup = function(app, env) {
    app.use('/api/projects', routers.projects);
};

module.exports.models = models;