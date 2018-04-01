define([
    'dl-tools/shared/jira/client.service',
    'dl-tools/shared/jira/helper.service',
    'dl-tools/shared/jira/data-source.service',
    'dl-tools/shared/jira/auth/cookies.component',
    'dl-tools/shared/jira/auth/oauth.component',
    '@shared/data-source',
    '@shared/alt-auth',
], function(
        JiraApiClientFactory,
        JiraHelperFactory,
        JiraDataSourceFactory,
        jiraAuthCookiesComponent,
        jiraAuthOauthComponent
    ) {
        return {
            init: function(module) {
                module.factory('JiraApiClient', JiraApiClientFactory);
                module.factory('JiraHelper', JiraHelperFactory);
                module.factory('JiraDataSource', JiraDataSourceFactory);

                module.component('jiraAuthCookies', jiraAuthCookiesComponent);
                module.component('jiraAuthOauth', jiraAuthOauthComponent);
            },
            run: function(module, $injector) {
                $injector.get('HpDataSourcesRegistry')
                    .register($injector.get('JiraDataSource'));

                const HpAltAuthRegistry = $injector.get('HpAltAuthRegistry');
                HpAltAuthRegistry.register('jira-cookies', 'jira-auth-cookies');
                HpAltAuthRegistry.register('jira-oauth', 'jira-auth-oauth');
            }
        };
    });