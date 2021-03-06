define([
    '@shared/jira'
], function() {
    /* @ngInject */
    function personJiraCommentsDirective() {

        /**
         * Convert comment from Jira to a simpler structure.
         * @param {object} comment
         * @returns {{date: Date, dateFormatted: string, body: *, issue: {key: *, summary: (*|string)}}}
         */
        function convertJiraComment(comment) {
            let date = new Date(comment.updated);
            return {
                date: date,
                dateFormatted: date.toLocaleString(),
                body: comment.body,
                issue: {
                    key: comment.issue.key,
                    summary: comment.issue.fields.summary
                }
            };
        }

        return {
            scope: {
                username: '<',
                fromDate: '<',
                toDate: '<',
                issueFilter: '<',
                jiraBaseUrl: '<'
            },
            /* @ngInject */
            controller: function($scope, JiraHelper) {
                $scope.$watchGroup(['username', 'fromDate', 'toDate', 'issueFilter'], () => {
                    JiraHelper.getUserComments(
                        $scope.username, $scope.fromDate, $scope.toDate, $scope.issueFilter,
                        function (comments) {
                            $scope.comments = comments.map(convertJiraComment);
                        });
                });
            },
            templateUrl: 'dl-tools/components/people-activity/person/person-jira-comments.directive.tpl.html'
        };
    }

    return personJiraCommentsDirective;
});