define([
    './client.service',
    './helper.service',
    './data-source.service',
    '@shared/data-source'
], function(apiClientFactory, helperFactory, dataSourceFactory) {
    return {
        init: function(module) {
            module.factory('GitlabApiClient', apiClientFactory);
            module.factory('GitlabHelper', helperFactory);
            module.factory('GitlabDataSource', dataSourceFactory);
        },
        run: function(module, $injector) {
            $injector.get('HpDataSourcesRegistry')
                .register($injector.get('GitlabDataSource'));
        }
    };
});