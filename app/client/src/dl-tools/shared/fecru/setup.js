define([
    './client.service',
    './helper.service',
    './data-service.service',
    'client-shared-data-services-manager'
], function(FecruApiClientFactory, FecruHelperFactory, FecruDataServiceFactory) {
    return {
        init: function(module) {
            module.factory('FecruApiClient', FecruApiClientFactory);
            module.factory('FecruHelper', FecruHelperFactory);
            module.factory('FecruDataService', FecruDataServiceFactory);
        },
        run: function(module, $injector) {
            let DataServicesManager = $injector.get('DataServicesManager');
            let fecruDataService = $injector.get('FecruDataService');
            DataServicesManager.register(fecruDataService);
        }
    };
});