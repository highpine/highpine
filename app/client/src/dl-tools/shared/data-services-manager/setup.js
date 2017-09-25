define([
    'dl-tools/shared/data-services-manager/manager.service',
    'dl-tools/shared/data-services-manager/abstract-data-service.service',
    'dl-tools/shared/data-services-manager/manager.directive'
], function(ManagerFactory, AbstractDataServiceFactory, DataServicesManagerDirective) {
    return function(module) {
        module.factory('DataServicesManager', ManagerFactory);
        module.factory('AbstractDataService', AbstractDataServiceFactory);
        module.directive('dataServicesManager', DataServicesManagerDirective);
        module.constant('AUTH_STATUS_SUCCESS', 'success');
        module.constant('AUTH_STATUS_ERROR', 'error');

        /* @ngInject */
        module.config(function($httpProvider) {
            $httpProvider.interceptors.push(function($q, $rootScope) {
                return {
                    responseError: function(rejection) {
                        // todo: responses from the services should be marked with the service name, so that it is clear what service failed.
                        if (rejection.status == 401) {
                            $rootScope.$broadcast('unauthorized', rejection);
                        }
                        return $q.reject(rejection);
                    }
                };
            });
        });
    };
});