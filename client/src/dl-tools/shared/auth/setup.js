define([
    'dl-tools/shared/auth/auth.service',
    'dl-tools/shared/auth/logout-link.directive'
], function(AuthServiceFactory, LogoutLinkDirective) {
    return function(module) {
        module.factory('Auth', AuthServiceFactory);
        module.directive('logoutLink', LogoutLinkDirective);
    };
});