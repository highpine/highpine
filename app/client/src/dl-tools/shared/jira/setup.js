define([
    'dl-tools/shared/jira/client.service',
    'dl-tools/shared/jira/helper.service',
    'dl-tools/shared/jira/data-service.service',
    'client-shared-data-services-manager'
], function(JiraApiClientFactory, JiraHelperFactory, JiraDataServiceFactory) {
    return {
        init: function(module) {
            module.factory('JiraApiClient', JiraApiClientFactory);
            module.factory('JiraHelper', JiraHelperFactory);
            module.factory('JiraDataService', JiraDataServiceFactory);
        },
        run: function(module, $injector) {
            let DataServicesManager = $injector.get('DataServicesManager');
            let jiraDataService = $injector.get('JiraDataService');
            DataServicesManager.register(jiraDataService);
        }
    };
});