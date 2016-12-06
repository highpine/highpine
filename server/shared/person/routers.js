var models = require('./models');
var ApiResource = require('shared/api').ApiResource;

module.exports = {
    people: (new ApiResource(models.Person)).router
};