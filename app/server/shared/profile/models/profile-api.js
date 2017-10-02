/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

let BasicApiModel = require('shared/api-server').BasicApiModel;

class ProfileApiModel extends BasicApiModel {
    construct (toObjectOptions) {
        this.toObjectOptions = toObjectOptions || {
            versionKey: false
        };
    }
}

module.exports = ProfileApiModel;