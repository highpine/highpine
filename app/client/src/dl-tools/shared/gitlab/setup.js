define([
    './client.service',
    './helper.service',
    './data-service.service',
    'client-shared-data-services-manager'
], function(GitlabApiClientFactory, GitlabHelperFactory, GitlabDataServiceFactory) {
    return {
        init: function(module) {
            module.factory('GitlabApiClient', GitlabApiClientFactory);
            module.factory('GitlabHelper', GitlabHelperFactory);
            module.factory('GitlabDataService', GitlabDataServiceFactory);
        },
        run: function(module, $injector) {
            let DataServicesManager = $injector.get('DataServicesManager');
            let gitlabDataService = $injector.get('GitlabDataService');
            DataServicesManager.register(gitlabDataService);
        }
    };
});