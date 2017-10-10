/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

let AbstractDataService = require('shared/data-services-manager').AbstractDataService;

class JiraDataService extends AbstractDataService {

    getKey() {
        return 'jira';
    }

    authorize(username, password, callback) {
        let anonymousProxy = this.proxyRegistry.anonymous();
        let options = {
            url: anonymousProxy.proxyUrl('/session'),
            method: 'POST',
            json: true,
            body: {
                username: username,
                password: password
            }
        };
        anonymousProxy.request(options, function (error, apiResponse, body) {
            if (error) {
                return callback(error);
            }
            if (apiResponse.statusCode !== 200 || !body.session) {
                let error = new Error(
                    body.errorMessages ? body.errorMessages.join("\n") : 'Jira authorization failed.'
                );
                error.statusCode = apiResponse.statusCode;
                error.responseBody = body;
                callback(error);
                return;
            }

            callback(null, {
                token: body.session
            });
        });
    }
}

module.exports = JiraDataService;