define([
    'dl-tools/shared/jira-alt-auth-cookies/jira-alt-auth-cookies.component',
    '@shared/alt-auth'
], function(jiraAltAuthCookiesComponent) {
    return {
        init(module) {
            module.component('jiraAltAuthCookies', jiraAltAuthCookiesComponent);
        },
        run(module, $injector) {
            $injector.get('HpAltAuthRegistry').register('jira-cookies', 'jira-alt-auth-cookies');
        }
    };
});