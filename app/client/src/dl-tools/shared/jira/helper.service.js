define([], function() {
    /* @ngInject */
    function JiraHelperFactory(JiraDataService) {

        /**
         * Get Jira-style formatted date.
         * @param {Date} date
         * @returns {string}
         */
        function getJiraDate(date) {
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }

        return {
            /**
             * Get comments posted by the user.
             *
             * @param {string} username
             * @param {Date|null} fromDate
             * @param {Date|null} toDate
             * @param {string|null} issueFilter
             * @param {function} callback
             * @returns todo: Make it return promise
             */
            getUserComments: function(username, fromDate, toDate, issueFilter, callback) {
                var jql = 'Participants = ' + username;
                if (fromDate) {
                    jql += ' AND (updated >= ' + getJiraDate(fromDate) + ')';
                }
                if (toDate) {
                    jql += ' AND (updated <= ' + getJiraDate(toDate) + ')';
                }
                if (issueFilter) {
                    jql += ' AND (' + issueFilter + ')';
                }

                var searchParams = {
                    jql: jql,
                    startAt: 0,
                    maxResults: 500,
                    fields: ['summary', 'comment']
                };

                /**
                 * Comment filtering callback.
                 * @param {object} comment
                 * @returns {boolean}
                 */
                var commentFilter = function(comment) {
                    var isRelevant = (comment.author.name == username);
                    if (fromDate) {
                        isRelevant = isRelevant && (new Date(comment.updated)) > fromDate;
                    }
                    return isRelevant;
                };

                /**
                 * Comment sorting callback.
                 * @param {object} comment1
                 * @param {object} comment2
                 * @returns {number}
                 */
                var commentSorter = function(comment1, comment2) {
                    if (comment1.date < comment2.date) {
                        return 1;
                    }
                    if (comment1.date > comment2.date) {
                        return -1;
                    }
                    return 0;
                };

                return JiraDataService.getApiClient().search().get(searchParams, function (result) {
                    var userComments = result.issues.reduce(function(currentValue, issue) {
                        var userIssueComments = issue.fields.comment.comments
                            .filter(commentFilter)
                            .map(function(comment) {
                                comment.issue = issue;
                                return comment;
                            });

                        return currentValue.concat(userIssueComments);
                    }, []);

                    callback(userComments.sort(commentSorter));
                });
            }
        };
    }

    return JiraHelperFactory;
});