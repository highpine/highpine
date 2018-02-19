define(['jquery'], function($) {
    /* @ngInject */
    return function($compile, HpDataSourcesRegistry) {
        return {
            link(scope, element, attrs) {
                
            },
            /* @ngInject */
            controller: function($scope, HpDataSourcesRegistry, HpModal) {
                $scope.dataSources = HpDataSourcesRegistry.getAll();

                $scope.$on('data-source.auth-request', function(event, dataSource, returnTo) {
                    $scope.showAuthDialog(dataSource, returnTo);
                });

                $scope.showAuthDialog = function(dataSource, returnTo) {

                    if (dataSource.isAuthorized) {
                        return;
                    }

                    let $authForm = $('<div />');
                    $authForm.append(`<p>Please authorize with ${dataSource.name} to proceed using its API.</p>`);
                    $authForm.append($(`<${dataSource.authComponentName} return-to="${returnTo}" />`));

                    HpModal.popup(dataSource.name, $authForm.html());
                };
            },
            templateUrl: 'highpine/shared/data-source/data-sources-auth-status.tpl.html'
        };
    };
});