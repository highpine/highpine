define([
    'dl-tools/shared/jira-api/client.service',
    'dl-tools/shared/jira-api/jira-data-service.service'
], function(JiraApiClientFactory, JiraDataServiceFactory) {
    return function(module) {
        module.factory('JiraApiClient', JiraApiClientFactory);
        module.factory('JiraDataService', JiraDataServiceFactory);
    };
});