define([
    '@shared/jira'
], function() {
    /* @ngInject */
    function profileController($scope, UserStorage, HpDataSourcesRegistry) {
        $scope.user = UserStorage.get();
        $scope.dataSources = HpDataSourcesRegistry.getAll();
    }

    return profileController;
});