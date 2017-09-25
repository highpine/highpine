/**
 * Person component schemas.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let personSchema = new Schema({
    first_name: String,
    last_name: String,
    jira_id: String,
    email: String,
    username: String,
    password_hash: String,
    hash_salt: String,
    auth_tokens: Object,
    avatar: String,
    account_completed: Boolean
});

personSchema.set('toObject', {
    versionKey: false,
    transform: function (doc, plain, options) {
        delete plain.password_hash;
        delete plain.hash_salt;
        delete plain.auth_tokens;
        return plain;
    }
});

personSchema.virtual('full_name')
    .get(function() {
        if (typeof this.first_name === 'undefined' && typeof this.last_name === 'undefined') {
            return null;
        }
        return ((this.first_name || '') + ' ' + (this.last_name || '')).trim();
    })
    .set(function(name) {
        if (typeof name !== 'string') {
            return;
        }
        [this.first_name, this.last_name] = name.split(' ');
    });

personSchema.virtual('password')
    .set(function(password) {
        if (typeof this.hash_salt === 'undefined') {
            this.hash_salt = generateHashSalt();
        }
        this.set('password_hash', hashPassword(password, this.hash_salt));
    });

function hashPassword(password, hashSalt) {
    return password + hashSalt; // todo: add real hashing
}
function generateHashSalt() {
    return '' + Math.random();  // todo: add real hashing
}

personSchema.statics.getIdQuery = function(id) {
    if (id.charAt(0) === '@') {
        return { username: id.substr(1) };
    } else {
        return { _id: id };
    }
};

personSchema.statics.findByUsername = function(username, callback) {
    return this.findOne({ username: username }, callback);
};

personSchema.methods.passwordIsValid = function (password) {
    return this.password_hash === hashPassword(password, this.hash_salt);
};

module.exports.Person = mongoose.model('Person', personSchema);