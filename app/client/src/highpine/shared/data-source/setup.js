define([
    './registry.service',
    './data-source',
    './data-sources-auth-status.directive',
], function(registryFactory, DataSource, dataSourcesAuthStatusDirective) {
    return {
        init(module) {
            module.factory('HpDataSourcesRegistry', registryFactory);
            module.value('HpDataSource', DataSource);
            module.directive('hpDataSourcesAuthStatus', dataSourcesAuthStatusDirective);

            /* @ngInject */
            // module.config(function($httpProvider) {
            //     $httpProvider.interceptors.push(function($q, $rootScope) {
            //         return {
            //             responseError: function(rejection) {
            //                 // todo: responses from the services should be marked with the service name,
            //                 //       so that it is clear which exactly service failed.
            //                 if (rejection.status === 401) {
            //                     $rootScope.$broadcast('unauthorized', rejection);
            //                 }
            //                 return $q.reject(rejection);
            //             }
            //         };
            //     });
            // });
        }
    };
});