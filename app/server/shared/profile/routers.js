/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

let Profile = require('./models/profile');
let ProfileApiModel = require('./models/profile-api');
let ApiResource = require('shared/api-server').ApiResource;

module.exports = {
    profiles: (new ApiResource(Profile, new ProfileApiModel())).router
};