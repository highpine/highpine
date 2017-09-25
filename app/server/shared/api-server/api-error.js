function ApiError(message) {
    this.message = message;
    this.stack = Error().stack;
}
ApiError.prototype = Object.create(Error.prototype);
ApiError.prototype.name = "ApiError";
ApiError.prototype.constructor = ApiError;

ApiError.withStatusCode = function(statusCode, message) {
    var apiError = new ApiError(message);
    apiError.status = statusCode;
    return apiError;
};

module.exports = ApiError;