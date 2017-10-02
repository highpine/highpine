/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

class ApiError extends Error {
    constructor(message, id) {
        super(message, id);
        this.message = message;
        this.stack = Error().stack;
    }
    static withStatusCode (statusCode, message) {
        let apiError = new ApiError(message);
        apiError.status = statusCode;
        return apiError;
    };
}

module.exports = ApiError;