define([
    'dl-tools/shared/jira/client.service',
    'dl-tools/shared/jira/helper.service',
    'dl-tools/shared/jira/data-service.service',
    'client-shared-data-services-manager'
], function(JiraApiClientFactory, JiraHelperFactory, JiraDataServiceFactory) {
    return function(module) {
        module.factory('JiraApiClient', JiraApiClientFactory);
        module.factory('JiraHelper', JiraHelperFactory);
        module.factory('JiraDataService', JiraDataServiceFactory);
    };
});