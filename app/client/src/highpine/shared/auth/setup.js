define([
    './user-storage.service',
    './auth.service'
], function(userStorageServiceFactory, authServiceFactory) {
    return function(module) {
        module.factory('UserStorage', userStorageServiceFactory);
        module.factory('Auth', authServiceFactory);
    };
});