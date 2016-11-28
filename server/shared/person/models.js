/**
 * Person component schemas.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = new Schema({
    first_name: String,
    last_name: String,
    jira_id: String,
    username: String,
    email: String,
    password_hash: String,
    salt: String,
    avatar: String
});

personSchema.virtual('full_name').get(function() {
    return this.first_name + ' ' + this.last_name;
});
personSchema.virtual('full_name').set(function(name) {
    [this.first_name, this.last_name] = name.split(' ');
});

var personModel = mongoose.model('Person', personSchema);
personModel.apiFields = {
    list: ['_id', 'first_name', 'last_name', 'full_name', 'jira_id', 'username', 'email', 'avatar'],
    view: ['_id', 'first_name', 'last_name', 'full_name', 'jira_id', 'username', 'email', 'avatar']
};
module.exports.Person = personModel;