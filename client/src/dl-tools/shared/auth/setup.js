define([
    'dl-tools/shared/auth/auth.service'
], function(authServiceFactory, logoutLinkDirective) {
    return function(module) {
        module.factory('Auth', authServiceFactory);
    };
});