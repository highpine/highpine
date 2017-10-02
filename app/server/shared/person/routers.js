/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

let Person = require('./models/person');
let PersonApiModel = require('./models/person-api');
let ApiResource = require('shared/api-server').ApiResource;

module.exports = {
    people: (new ApiResource(Person, new PersonApiModel)).router
};