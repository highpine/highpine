var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({ appName: 'Highpine REST API v1' });
});

module.exports = router;
