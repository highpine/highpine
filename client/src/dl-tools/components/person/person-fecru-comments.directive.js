define([
    'client-shared-fecru'
], function() {
    /* @ngInject */
    function personFecruCommentsDirective() {

        /**
         * Convert comment from Fecru to a simpler structure.
         * @param {object} comment
         * @returns {{date: Date, dateFormatted: string, body: *, review: {key: *, summary: *}}}
         */
        function convertFecruComment(comment) {
            var date = new Date(comment.createDate);
            return {
                date: date,
                dateFormatted: date.toLocaleString(),
                body: comment.message.replace(/</g, '&lt;').replace(/>/g, '&gt;'), // todo: maybe use method from http://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript
                review: {
                    key: comment.review.permaId.id,
                    summary: comment.review.name
                }
            };
        }

        return {
            scope: {
                username: '=',
                fromDate: '=',
                toDate: '=',
                fecruBaseUrl: '='
            },
            /* @ngInject */
            controller: function($scope, FecruHelper) {
                FecruHelper.getUserComments(
                    $scope.username, $scope.fromDate, $scope.toDate,
                    function(comments) {
                        $scope.comments = comments.map(convertFecruComment);
                    });
            },
            templateUrl: 'components/person/person-fecru-comments.directive.tpl.html'
        };
    }

    return personFecruCommentsDirective;
});