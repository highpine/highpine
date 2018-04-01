/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

const anonymous = Symbol('Anonymous property key');
const registry = Symbol('Registry property key');

class ApiProxyRegistry {
    constructor(proxyFactory) {
        this[anonymous] = null;
        this[registry] = new Map();
        this.factory = proxyFactory;
    }

    anonymous() {
        if (!this[anonymous]) {
            this[anonymous] = this.factory();
        }
        return this[anonymous];
    }

    withToken(token) {
        if (!token) {
            return this.anonymous();
        }
        this.registerToken(token);
        let tokenHash = this.constructor.getTokenHash(token);
        return this[registry].get(tokenHash);
    }

    registerToken(token) {
        let tokenHash = this.constructor.getTokenHash(token);
        if (!this[registry].has(tokenHash)) {
            this[registry].set(tokenHash, this.createAuthorizedProxy(token));
        }
    }

    dropToken(token) {
        let tokenHash = this.constructor.getTokenHash(token);
        this[registry].delete(tokenHash);
    }

    createAuthorizedProxy(token) {
        return this.factory(token);
    }

    static getTokenHash(token) {
        return JSON.stringify(token);
    }
}

module.exports = ApiProxyRegistry;
