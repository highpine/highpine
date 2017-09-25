define([
    'ngstorage'
], function() {
    /* @ngInject */
    function userService($sessionStorage) {
        function dropSessionUser() {
            delete $sessionStorage.user;
        }
        function setSessionUser(user) {
            $sessionStorage.user = user;
        }
        function getSessionUser() {
            return $sessionStorage.user;
        }
        return {
            get: getSessionUser,
            update: setSessionUser,
            drop: dropSessionUser
        };
    }

    return userService;
});