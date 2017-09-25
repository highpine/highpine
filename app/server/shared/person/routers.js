var models = require('./models');
var ApiResource = require('shared/api-server').ApiResource;

module.exports = {
    people: (new ApiResource(models.Person)).router
};