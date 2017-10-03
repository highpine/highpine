/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

let express = require('express');
let router = express.Router();
let DataServicesManager = require('shared/data-services-manager').manager;

function getAuthorizedProxy(user) {
    let jiraProxyRegistry = DataServicesManager.getService('jira').getProxyRegistry();
    return jiraProxyRegistry.withToken(user.auth_tokens.jira);
}

router.get(/\/.*/, function(req, res, next) {
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
