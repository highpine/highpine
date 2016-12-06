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
personSchema.set('toObject', { versionKey: false });
personSchema.virtual('full_name').get(function() {
    if (this.first_name == undefined && this.last_name == undefined) {
        return null;
    }
    return ((this.first_name || '') + ' ' + (this.last_name || '')).trim();
});
personSchema.virtual('full_name').set(function(name) {
    if (typeof name != 'string') {
        return;
    }
    [this.first_name, this.last_name] = name.split(' ');
});
personSchema.statics.getIdQuery = function(id) {
    if (id.charAt(0) === '@') {
        return { username: id.substr(1) };
    } else {
        return { _id: id };
    }
};


module.exports.Person = mongoose.model('Person', personSchema);