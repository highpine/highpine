/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

/**
 * Person component schemas.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let personSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    jira_id: {
        type: String
    },
    email: {
        type: String
    },
    password_hash: {
        type: String
    },
    hash_salt: {
        type: String
    },
    auth_tokens: {
        type: Object
    },
    avatar: {
        type: String
    },
    account_completed: {
        type: Boolean
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
        [this.first_name, this.last_name] = name.split(' ', 2);
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

personSchema.statics.findByUsername = function(username, callback) {
    return this.findOne({ username: username }, callback);
};

personSchema.methods.passwordIsValid = function (password) {
    return this.password_hash === hashPassword(password, this.hash_salt);
};

module.exports = mongoose.model('Person', personSchema);