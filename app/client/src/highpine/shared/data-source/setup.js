define([
    './registry.service',
    './data-source',
    './data-sources-auth-status.component',
], function(registryFactory, DataSource, dataSourcesAuthStatusComponent) {
    return {
        init(module) {
            module.factory('HpDataSourcesRegistry', registryFactory);
            module.value('HpDataSource', DataSource);
            module.component('hpDataSourcesAuthStatus', dataSourcesAuthStatusComponent);

            /* @ngInject */
            module.config(function($httpProvider) {
                $httpProvider.interceptors.push(function($q, $rootScope) {
                    return {
                        responseError: function(rejection) {
                            // todo: responses from the services should be marked with the service name,
                            //       so that it is clear which exactly service failed.
                            if (rejection.status === 401) {
                                $rootScope.$broadcast('unauthorized', rejection);
                            }
                            return $q.reject(rejection);
                        }
                    };
                });
            });
        }
    };
});