define([
    './client.service',
    './helper.service',
    './data-service.service',
    'client-shared-data-services-manager'
], function(GitlabApiClientFactory, GitlabHelperFactory, GitlabDataServiceFactory) {
    return function(module) {
        module.factory('GitlabApiClient', GitlabApiClientFactory);
        module.factory('GitlabHelper', GitlabHelperFactory);
        module.factory('GitlabDataService', GitlabDataServiceFactory);
    };
});