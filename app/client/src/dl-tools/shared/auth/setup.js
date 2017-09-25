define([
    'dl-tools/shared/auth/user-storage.service',
    'dl-tools/shared/auth/auth.service'
], function(userStorageServiceFactory, authServiceFactory) {
    return function(module) {
        module.factory('UserStorage', userStorageServiceFactory);
        module.factory('Auth', authServiceFactory);
    };
});