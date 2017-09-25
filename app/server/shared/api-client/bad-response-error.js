function BadResponseError(message) {
    this.message = message;
    this.stack = Error().stack;
}
BadResponseError.prototype = Object.create(Error.prototype);
BadResponseError.prototype.name = "ApiError";
BadResponseError.prototype.constructor = BadResponseError;

BadResponseError.withStatusCode = function(statusCode, message) {
    var apiError = new BadResponseError(message);
    apiError.status = statusCode;
    return apiError;
};

module.exports = BadResponseError;