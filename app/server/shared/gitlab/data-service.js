/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

let AbstractDataService = require('shared/data-services-manager').AbstractDataService;

class gitlabDataService extends AbstractDataService {
    getKey() {
        return 'gitlab';
    }
};

module.exports = gitlabDataService;