/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

class DataServicesRegistry extends Map {
    /**
     * Register a service.
     * @param {AbstractDataService} service
     */
    register (service) {
        let key = service.getKey();
        if (this.has(key)) {
            throw new Error('Data Service with name "' + key + '" is already registered.');
        }
        this.set(key, service);
    }
}

let dataServicesRegistry = new DataServicesRegistry();

module.exports = dataServicesRegistry;