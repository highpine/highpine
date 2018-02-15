define(['angular'], function(angular) {
    /* @ngInject */
    return {
        /* @ngInject */
        controller: function($scope, $state, HpDataSourcesRegistry, UserStorage) {

            const $ctrl = this;
            this.dataSources = HpDataSourcesRegistry.getAll();
            // todo: get rid of using UserStorage here.
            // DataSources should know about their auth status by themselves.
            let user = UserStorage.get() || {};

            if (user.auth_tokens) {
                authorizeDataServices(user.auth_tokens);
            }

            $scope.$on('login.success', function(event, user) {
                authorizeDataServices(user.auth_tokens);
            });
            $scope.$on('logout', function(event) {
                unauthorizeDataServices();
                // todo: get rid of redirecting user by data sources component.
                // This should be on another level.
                // See also line 29.
                $state.go('login');
            });
            $scope.$on('unauthorized', function(event) {
                unauthorizeDataServices();
                $state.go('login');
            });

            function authorizeDataServices(authTokens) {
                authTokens = authTokens || {};
                $ctrl.dataSources.forEach(function (dataSource) {
                    if (authTokens[dataSource.getKey()]) {
                        dataSource.authorize();
                    } else {
                        dataSource.unauthorize();
                    }
                });
            }

            function unauthorizeDataServices() {
                $ctrl.dataSources.forEach(function (dataSource) {
                    dataSource.unauthorize();
                });
            }
        },
        templateUrl: 'highpine/shared/data-source/data-sources-auth-status.tpl.html'
    };
});