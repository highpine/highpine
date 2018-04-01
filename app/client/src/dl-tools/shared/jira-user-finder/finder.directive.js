define([
    '@shared/jira'
], function() {
    /* @ngInject */
    function logoutLinkDirective() {
        return {
            scope: {
                selectUser: '=callback',
                minSearchTermLength: '=?minLength'
            },
            /* @ngInject */
            controller: function($scope, $timeout, $sce, JiraDataSource) {

                $scope.users = [];

                var minSearchTermLength = $scope.minSearchTermLength || 1;
                var searchRunTimeout = 150;
                var searchPromise, pickerRequest;

                $scope.searchUsers = function(searchTerm) {
                    if (searchPromise) {
                        $timeout.cancel(searchPromise);
                    }
                    if (pickerRequest && pickerRequest.$cancelRequest) {
                        pickerRequest.$cancelRequest();
                    }
                    if (searchTerm && searchTerm.length >= minSearchTermLength) {
                        searchPromise = $timeout(function() {
                            searchPromise = null;
                            pickerRequest = JiraDataSource.getApiClient().userPicker()
                                .get({query: searchTerm}, function (result) {
                                    if (result.users) {
                                        $scope.users = result.users;
                                        $scope.users.forEach(function(user) {
                                            user.trustedHtml = $sce.trustAsHtml(user.html);
                                            user.trustedDisplayName = $sce.trustAsHtml(user.displayName);
                                        });
                                    } else {
                                        $scope.users = [];
                                    }
                                });
                        }, searchRunTimeout);
                    } else {
                        $scope.users = [];
                    }
                };

            },
            templateUrl: 'dl-tools/shared/jira-user-finder/finder.tpl.html'
        };
    }

    return logoutLinkDirective;
});