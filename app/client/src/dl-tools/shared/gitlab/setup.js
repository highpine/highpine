define([
    './client.service',
    './helper.service',
    './data-source.service',
    './auth/oauth.component',
    '@shared/data-source',
    '@shared/alt-auth',
], function(apiClientFactory, helperFactory, dataSourceFactory, gitlabAuthOauthComponent) {
    return {
        init: function(module) {
            module.factory('GitlabApiClient', apiClientFactory);
            module.factory('GitlabHelper', helperFactory);
            module.factory('GitlabDataSource', dataSourceFactory);
            module.component('gitlabAuthOauth', gitlabAuthOauthComponent);
        },
        run: function(module, $injector) {

            $injector.get('HpDataSourcesRegistry')
                .register($injector.get('GitlabDataSource'));

            $injector.get('HpAltAuthRegistry')
                .register('gitlab-oauth', 'gitlab-auth-oauth');
        }
    };
});