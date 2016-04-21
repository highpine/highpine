var express = require('express');
var async = require('async');
var router = express.Router();


function jiraRequestCallback(response, next) {
  return function (err, result) {
    if (err) {
      console.log(err);
      return next({message: err});
    }
    response.json(result);
  };
}

router.get('/issue/:issueNumber', function(req, res, next) {
  var jira = req.app.get('jira');
  jira.findIssue(req.params.issueNumber, jiraRequestCallback(res, next));
});

router.get('/search', function(req, res, next) {
  var jira = req.app.get('jira');

  var jql = req.query.jql;
  console.log('Searching issues with JQL:', jql);

  jira.client.search(jql, {startAt:0, maxResults: 10, fields:['summary', 'comment']}, jiraRequestCallback(res, next));
});

router.get('/new', function(req, res, next) {
  var jira = req.app.get('jira');

  jira.client.logout(jiraRequestCallback(res, next));
});

module.exports = router;
