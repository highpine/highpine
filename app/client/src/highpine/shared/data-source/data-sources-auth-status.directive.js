define(['jquery'], function($) {
    /* @ngInject */
    return function($compile, HpDataSourcesRegistry) {
        return {
            link(scope, element, attrs) {
                
            },
            /* @ngInject */
            controller: function($scope, HpDataSourcesRegistry, HpModal) {
                $scope.dataSources = HpDataSourcesRegistry.getAll();

                $scope.showAuthDialog = function(dataSource) {

                    if (dataSource.isAuthorized) {
                        return;
                    }

                    let $authForm = $('<div />');
                    $authForm.append(`<p>Please authorize with ${dataSource.name} to proceed using its API.</p>`);
                    $authForm.append($(`<${dataSource.authComponentName} />`));

                    HpModal.alert(dataSource.name, $authForm.html());
                };
            },
            templateUrl: 'highpine/shared/data-source/data-sources-auth-status.tpl.html'
        };
    };
});