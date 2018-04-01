let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.json({ appName: 'Highpine backend' });
});

module.exports = router;
