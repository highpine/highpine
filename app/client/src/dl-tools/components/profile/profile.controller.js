define([
    'client-shared-jira'
], function() {
    /* @ngInject */
    function profileController($scope, UserStorage) {
        $scope.user = UserStorage.get();
    }

    return profileController;
});