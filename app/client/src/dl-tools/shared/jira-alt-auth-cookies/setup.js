define([
    'client-shared-alt-auth',
    'dl-tools/shared/jira-alt-auth-cookies/jira-alt-auth-cookies.directive'
], function(altAuth, jiraAltAuthCookiesDirective) {
    return function(module) {

        altAuth.registry.registerService({
            getLoginButtonTitle: function() {
                return 'Login with Jira';
            },
            getDirectiveName: function() {
                return 'jira-alt-auth-cookies';
            }
        });

        module.directive('jiraAltAuthCookies', jiraAltAuthCookiesDirective);
    };
});