var models = require('./models');
var ApiResource = require('shared/api').ApiResource;

module.exports = {
    projects: (new ApiResource(models.Project)).router
};