define([
    './client.service',
    './helper.service',
    './data-source.service',
    './auth/token.component',
    '@shared/data-source',
    '@shared/alt-auth',
], function(FecruApiClientFactory, FecruHelperFactory, FecruDataSourceFactory, fecruAuthTokenComponent) {
    return {
        init: function(module) {
            module.factory('FecruApiClient', FecruApiClientFactory);
            module.factory('FecruHelper', FecruHelperFactory);
            module.factory('FecruDataSource', FecruDataSourceFactory);

            module.component('fecruAuthToken', fecruAuthTokenComponent);
        },
        run: function(module, $injector) {
            $injector.get('HpDataSourcesRegistry')
                .register($injector.get('FecruDataSource'));

            $injector.get('HpAltAuthRegistry')
                .register('fecru-token', 'fecru-auth-token');
        }
    };
});