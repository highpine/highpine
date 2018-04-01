/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

let Project = require('./models/project');
let BasicApiModel = require('shared/api-server').BasicApiModel;
let ApiResource = require('shared/api-server').ApiResource;

module.exports = {
    projects: (new ApiResource(Project, new BasicApiModel({ versionKey: false }))).router
};

