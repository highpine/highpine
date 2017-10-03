/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

class AbstractDataService {
    constructor(proxyRegistry) {
        this.proxyRegistry = proxyRegistry;
    }

    /**
     * @abstract
     * @return {string}
     */
    getKey() {
        return 'abstract';
    }

    getProxyRegistry() {
        return this.proxyRegistry;
    }
}

module.exports = AbstractDataService;