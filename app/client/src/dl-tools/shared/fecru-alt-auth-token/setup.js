define([
    '@shared/alt-auth',
    'dl-tools/shared/fecru-alt-auth-token/fecru-alt-auth-token.directive'
], function(altAuth, fecruAltAuthTokenDirective) {
    return function(module) {

        altAuth.registry.registerService({
            getLoginButtonTitle: function() {
                return 'Login with Fecru';
            },
            getDirectiveName: function() {
                return 'fecru-alt-auth-token';
            }
        });

        module.directive('fecruAltAuthToken', fecruAltAuthTokenDirective);
    };
});