define([
    'dl-tools/shared/jira/client.service',
    'dl-tools/shared/jira/helper.service',
    'dl-tools/shared/jira/data-source.service',
    '@shared/data-source'
], function(JiraApiClientFactory, JiraHelperFactory, JiraDataSourceFactory) {
    return {
        init: function(module) {
            module.factory('JiraApiClient', JiraApiClientFactory);
            module.factory('JiraHelper', JiraHelperFactory);
            module.factory('JiraDataSource', JiraDataSourceFactory);
        },
        run: function(module, $injector) {
            $injector.get('HpDataSourcesRegistry')
                .register($injector.get('JiraDataSource'));
        }
    };
});