define([
    './jira-alt-auth-oauth.component',
    '@shared/alt-auth',
], function(jiraAltAuthOauthComponent) {
    return {
        init: function(module) {
            module.component('jiraAltAuthOauth', jiraAltAuthOauthComponent);
        },
        run: function(module, $injector) {
            $injector.get('HpAltAuthRegistry').register('jira-oauth', 'jira-alt-auth-oauth');
        }
    };
});