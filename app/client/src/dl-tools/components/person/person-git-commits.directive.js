define([
    '@shared/gitlab'
], function() {
    /* @ngInject */
    function personGitlabCommentsDirective() {

        /**
         * Convert commit from Gitlab to a simpler structure.
         * @param {object} commit
         * @returns {{date: Date, dateFormatted: string, body: *, review: {key: *, summary: *}}}
         */
        function convertGitlabCommit(commit) {
            commit.date = new Date(commit.created_at);
            commit.dateFormatted = commit.date.toLocaleString();
            commit.message = commit.message || commit.title;
            return commit;
        }
        function commitsFilter(commit) {
            return commit.message.indexOf('Merge branch') !== 0;
        }

        return {
            scope: {
                username: '=',
                fromDate: '=',
                toDate: '=',
                gitlabBaseUrl: '='
            },
            /* @ngInject */
            controller: function($scope, GitlabHelper) {
                GitlabHelper.getUserCommits(
                    $scope.username, $scope.fromDate, $scope.toDate,
                    function(commits) {
                        $scope.commits = commits.map(convertGitlabCommit)
                            .filter(commitsFilter);
                    });
            },
            templateUrl: 'dl-tools/components/person/person-git-commits.directive.tpl.html'
        };
    }

    return personGitlabCommentsDirective;
});