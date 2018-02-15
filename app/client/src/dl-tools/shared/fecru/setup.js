define([
    './client.service',
    './helper.service',
    './data-source.service',
    '@shared/data-source'
], function(FecruApiClientFactory, FecruHelperFactory, FecruDataSourceFactory) {
    return {
        init: function(module) {
            module.factory('FecruApiClient', FecruApiClientFactory);
            module.factory('FecruHelper', FecruHelperFactory);
            module.factory('FecruDataSource', FecruDataSourceFactory);
        },
        run: function(module, $injector) {
            $injector.get('HpDataSourcesRegistry')
                .register($injector.get('FecruDataSource'));
        }
    };
});