define([
    './gitlab-alt-auth-oauth.component',
    '@shared/alt-auth',
], function(gitlabAltAuthOauthComponent) {
    return {
        init: function(module) {
            module.component('gitlabAltAuthOauth', gitlabAltAuthOauthComponent);
        },
        run: function(module, $injector) {
            $injector.get('HpAltAuthRegistry').register('gitlab-oauth', 'gitlab-alt-auth-oauth');
        }
    };
});