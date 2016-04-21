var express = require('express');
var router = express.Router();

function requestCallback(response, next) {
  return function (err, result) {
    if (err) {
      console.log(err);
      return next({message: err});
    }
    response.json(result);
  };
}


router.get('/', function(req, res, next) {
    req.app.get('fecru').client.getServerInfo(requestCallback(res, next));
});

router.get('/user-pref/:property', function(req, res, next) {
    req.app.get('fecru').client.getUserPreference(req.params.property, requestCallback(res, next));
});

router.get('/user-pref/:repo/:property', function(req, res, next) {
    req.app.get('fecru').client.getUserRepoPreference(req.params.repo, req.params.property, requestCallback(res, next));
});

router.get('/recently-visited', function(req, res, next) {
    req.app.get('fecru').client.getRecentlyVisitedItems(req.query.item, !!req.query.detailed, requestCallback(res, next));
});

router.get('/indexing-status/:repo', function(req, res, next) {
    req.app.get('fecru').client.getIndexingStatus(req.params.repo, requestCallback(res, next));
});

router.get('/repos', function(req, res, next) {
    req.app.get('fecru').client.getRepositories(req.query, requestCallback(res, next));
});


module.exports = router;
