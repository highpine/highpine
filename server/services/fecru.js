var fecru = require('node-fecru-api');

module.exports = function(fecruUrl, user, password) {
    var fecruClient = new fecru.FecruApiClient(fecruUrl, user, password);
    fecruClient.setStrictSSL(false);
    // todo: remove the next line after the authorization will be implemented.
    fecruClient.authorize(null, null, function() {});
    return {
        client: fecruClient
    };
};