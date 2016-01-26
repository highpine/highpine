var express = require('express');
var async = require('async');
var router = express.Router();


function jiraRequestCallback(response) {
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
  jira.findIssue(req.params.issueNumber, jiraRequestCallback(res));
});

router.get('/search', function(req, res, next) {
  var jira = req.app.get('jira');

  var jql = req.query.jql;
  console.log('Searching issues with JQL:', jql);

  jira.searchJira(jql, {startAt:0, maxResults: 500, fields:['summary', 'comment']}, jiraRequestCallback(res));
});

module.exports = router;
