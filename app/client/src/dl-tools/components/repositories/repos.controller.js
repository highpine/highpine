define([], function() {
    /* @ngInject */
    function controller($scope, $state) {
        $scope.openProject = function(project) {
            $state.go('repository', {
                namespace: project.namespace.path,
                name: project.path
            });
        };
    }

    return controller;
});