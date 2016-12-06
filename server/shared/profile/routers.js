var models = require('./models');
var ApiResource = require('shared/api').ApiResource;

module.exports = {
    profiles: (new ApiResource(models.Profile)).router
};