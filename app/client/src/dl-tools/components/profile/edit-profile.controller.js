define([
    'client-shared-jira'
], function() {
    /* @ngInject */
    function editProfileController($scope, UserStorage) {
        $scope.user = UserStorage.get();
    }

    return editProfileController;
});