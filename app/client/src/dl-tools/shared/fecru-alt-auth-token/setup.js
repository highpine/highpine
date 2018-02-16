define([
    'dl-tools/shared/fecru-alt-auth-token/fecru-alt-auth-token.component',
    '@shared/alt-auth',
], function(fecruAltAuthTokenComponent) {
    return {
        init(module) {
            module.component('fecruAltAuthToken', fecruAltAuthTokenComponent);
        },
        run(module, $injector) {
            $injector.get('HpAltAuthRegistry').register('fecru-token', 'fecru-alt-auth-token');
        }
    };
});