define([], function() {
    /* @ngInject */
    function controller($scope, $transition$, GitlabDataSource) {
        const stateParams = $transition$.params();
        const namespace = stateParams.namespace;
        const name = stateParams.name;

        let apiClient = GitlabDataSource.getApiClient();

        apiClient.project()
            .get({ project_id: namespace + '/' + name }, function (project) {
                $scope.project = project;
                $scope.document.title = 'Project: ' + project.name_with_namespace;
            });
    }

    return controller;
});