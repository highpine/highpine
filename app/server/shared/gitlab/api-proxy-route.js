/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

let express = require('express');
let router = express.Router();
let DataServicesRegistry = require('shared/data-services-manager').registry;

function getAuthorizedProxy(user) {
    let fecruProxyRegistry = DataServicesRegistry.get('gitlab').getProxyRegistry();
    return fecruProxyRegistry.withToken(user.auth_tokens.gitlab);
}

router.all(/\/.*/, function(req, res, next) {
    getAuthorizedProxy(req.user)
        .relay(req, function(error, response, body) {
            if (error) {
                return next(error);
            }
            res.statusCode = response.statusCode;
            res.append('Content-Type', response.headers['content-type']);
            body = typeof body === 'object' ? JSON.stringify(body) : body;
            res.end(body);
        });
});

module.exports = router;
