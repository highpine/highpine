var UserService = function(jira, fecru) {
    return {
        getDetails: function(username, callback) {
            jira.client.getUser(username, function (err, user) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, user);
            });
        },
        getJiraComments: function(username, periodStartDate, callback) {
            var jql = 'updated >= ' + getJiraDate(periodStartDate) + ' AND Participants = ' + username;
            var searchParams = {
                startAt: 0,
                maxResults: 500,
                fields: ['summary', 'comment']
            };
            jira.client.searchJira(jql, searchParams, function (err, result) {
                if (err) {
                    callback(err);
                    return;
                }

                var userComments = result.issues.reduce(function(currentValue, issue) {
                    var userIssueComments = issue.fields.comment.comments
                        .filter(function(comment) {
                            return jiraCommentIsRelevant(comment, username, periodStartDate)
                        })
                        .map(function(comment) {
                            return convertJiraComment(comment, issue);
                        });

                    return currentValue.concat(userIssueComments);
                }, []);

                callback(null, userComments.sort(commentsSorter));
            });
        },
        getFecruComments: function(username, periodStartDate, callback) {
            var filter = {
                reviewer: username,
                fromDate: periodStartDate.getTime()
            };
            fecru.client.filterReviews(filter, true, function (err, result) {
                if (err) {
                    callback(err);
                    return;
                }

                var userComments = result.detailedReviewData.reduce(function(currentValue, review) {
                    var userReviewComments = review.generalComments.comments
                        .concat(review.versionedComments.comments)
                        .filter(function(comment) {
                            return fecruCommentIsRelevant(comment, username, periodStartDate);
                        })
                        .map(function(comment) {
                            return convertFecruComment(comment, review);
                        });
                    return currentValue.concat(userReviewComments);
                }, []);

                callback(null, userComments.sort(commentsSorter));
            });
        }
    }
};

function getJiraDate(date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}


function jiraCommentIsRelevant(comment, username, periodStartDate) {
    return comment.author.name == username &&
        (new Date(comment.updated)) > periodStartDate;
}

function fecruCommentIsRelevant(comment, username, periodStartDate) {
    return comment.user.userName == username &&
        (new Date(comment.createDate)) > periodStartDate;
}

function convertJiraComment(comment, issue) {
    var date = new Date(comment.updated);
    return {
        date: date,
        dateFormatted: date.toLocaleString(),
        body: comment.body,
        issue: {
            key: issue.key,
            summary: issue.fields.summary
        }
    }
}

function convertFecruComment(comment, review) {
    var date = new Date(comment.createDate);
    return {
        date: date,
        dateFormatted: date.toLocaleString(),
        body: comment.message,
        review: {
            key: review.permaId.id,
            summary: review.name
        }
    }
}

function commentsSorter(comment1, comment2) {
    if (comment1.date < comment2.date) {
        return 1;
    }
    if (comment2.date < comment1.date) {
        return -1;
    }
    return 0;
}

module.exports.ServiceFactory = UserService;