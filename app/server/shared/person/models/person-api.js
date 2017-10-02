/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

let BasicApiModel = require('shared/api-server').BasicApiModel;

class PersonApiModel extends BasicApiModel {
    construct (toObjectOptions) {
        this.toObjectOptions = toObjectOptions || {
            versionKey: false,
            transform: function (doc, plain, options) {
                delete plain.password_hash;
                delete plain.hash_salt;
                delete plain.auth_tokens;
                return plain;
            }
        };
    }
    getIdQuery (id, req) {
        if (id.charAt(0) === '@') {
            return { username: id.substr(1) };
        } else {
            return { _id: id };
        }
    }
}

module.exports = PersonApiModel;