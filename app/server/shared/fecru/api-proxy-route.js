var express = require('express');
var router = express.Router();

router.get(/\/.*/, function(req, res, next) {
    var proxyRegistry = req.app.get('fecru-proxy-registry');
    proxyRegistry.withToken(req.session.fecruToken)
        .relay(req, function(error, response, body) {
            if (error) {
                next(error);
                return;
            }
            res.statusCode = response.statusCode;
            res.append('Content-Type', response.headers['content-type']);
            body = typeof body == 'object' ? JSON.stringify(body) : body;
            res.end(body);
        });
});

module.exports = router;
