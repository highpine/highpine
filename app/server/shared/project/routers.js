var models = require('./models');
var ApiResource = require('shared/api-server').ApiResource;

module.exports = {
    projects: (new ApiResource(models.Project)).router
};