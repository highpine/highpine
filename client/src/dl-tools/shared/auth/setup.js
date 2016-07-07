define([
    'dl-tools/shared/auth/auth.service',
    'dl-tools/shared/auth/logout-link.directive'
], function(authServiceFactory, logoutLinkDirective) {
    return function(module) {
        module.factory('Auth', authServiceFactory);
        module.directive('logoutLink', logoutLinkDirective);
    };
});