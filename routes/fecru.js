var express = require('express');
var router = express.Router();
var fecru = require('../lib/fecru');

var fecruClient = new fecru.FecruApiClient(
    process.env.FECRU_URL,
    process.env.JIRA_USER,
    process.env.JIRA_PASSWORD
);
fecruClient.setStrictSSL(false);

function requestCallback(response, next) {
  return function (err, result) {
    if (err) {
      console.log(err);
      return next({message: err});
    }
    response.json(result);
  };
}

router.get('/auth', function(req, res, next) {
    fecruClient.authorize(null, null, requestCallback(res, next));
});

router.get('/server-info', function(req, res, next) {
    fecruClient.getServerInfo(requestCallback(res, next));
});

router.get('/user-pref/:property', function(req, res, next) {
    fecruClient.getUserPreference(req.params.property, requestCallback(res, next));
});

router.get('/user-pref/:repo/:property', function(req, res, next) {
    fecruClient.getUserRepoPreference(req.params.repo, req.params.property, requestCallback(res, next));
});

router.get('/recently-visited', function(req, res, next) {
    fecruClient.getRecentlyVisitedItems(req.query.item, !!req.query.detailed, requestCallback(res, next));
});

router.get('/indexing-status/:repo', function(req, res, next) {
    fecruClient.getIndexingStatus(req.params.repo, requestCallback(res, next));
});

router.get('/repos', function(req, res, next) {
    fecruClient.getRepositories(req.query, requestCallback(res, next));
});


module.exports = router;
