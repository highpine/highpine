var fecru = require('../lib/fecru');

module.exports = function(fecruUrl, user, password) {
    var fecruClient = new fecru.FecruApiClient(fecruUrl, user, password);
    fecruClient.setStrictSSL(false);
    fecruClient.authorize(null, null, function() {});
    return {
        client: fecruClient
    };
};