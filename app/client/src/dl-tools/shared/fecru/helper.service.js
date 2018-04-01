define([], function() {
    /* @ngInject */
    function FecruHelperFactory(FecruDataSource) {
        return {
            /**
             * Get comments posted by the user.
             *
             * @param {string} username
             * @param {Date|null} fromDate
             * @param {Date|null} toDate
             * @param {function} callback
             * @returns todo: Make it return promise
             */
            getUserComments: function(username, fromDate, toDate, callback) {
                var filter = {
                    reviewer: username
                };
                if (fromDate) {
                    filter.fromDate = fromDate.getTime();
                }
                if (toDate) {
                    filter.toDate = toDate.getTime();
                }

                /**
                 * Comment filtering callback.
                 * @param {object} comment
                 * @returns {boolean}
                 */
                var commentFilter = function(comment) {
                    var isRelevant = comment.user.userName == username;
                    if (fromDate) {
                        isRelevant = isRelevant && (new Date(comment.createDate)) > fromDate;
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

                return FecruDataSource.getApiClient().reviews().get(filter, function (result) {
                    var userComments = result.detailedReviewData.reduce(function(currentValue, review) {
                        var userReviewComments = review.generalComments.comments
                            .concat(review.versionedComments.comments)
                            .filter(commentFilter)
                            .map(function(comment) {
                                comment.review = review;
                                return comment;
                            });
                        return currentValue.concat(userReviewComments);
                    }, []);

                    callback(userComments.sort(commentSorter));
                });
            }
        };
    }

    return FecruHelperFactory;
});