/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

class BasicApiModel {
    constructor (toObjectOptions) {
        this.toObjectOptions = toObjectOptions || {};
    }
    getIdQuery(id, req) {
        return { _id: id };
    }
    toPlainObject (document) {
        return document.toObject(this.toObjectOptions);
    }
}

module.exports = BasicApiModel;