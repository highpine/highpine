define([
    './client.service',
    './helper.service',
    './data-service.service',
    'client-shared-data-services-manager'
], function(FecruApiClientFactory, FecruHelperFactory, FecruDataServiceFactory) {
    return function(module) {
        module.factory('FecruApiClient', FecruApiClientFactory);
        module.factory('FecruHelper', FecruHelperFactory);
        module.factory('FecruDataService', FecruDataServiceFactory);
    };
});