define([
    'ngstorage'
], function() {
    /* @ngInject */
    function authService($http, $sessionStorage, BACKEND_URL) {
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
            /**
             * @param {object} credentials Normally: { username: username, password: password }
             * @returns {Promise.<TResult>|Promise|*}
             */
            login: function(credentials) {
                return $http.post(BACKEND_URL + '/auth/login', credentials)
                    .then(function(response) {
                        setSessionUser(response.data);
                        return response.data;
                    }, function() {
                        dropSessionUser();
                    });
            },
            isLoggedIn: function() {
                return typeof getSessionUser() !== 'undefined';
            },
            logout: function() {
                return $http.post(BACKEND_URL + '/auth/logout', {})
                    .then(function(result) {
                        dropSessionUser();
                        return result.data;
                    });
            },
            verify: function() {
                return $http.get(BACKEND_URL + '/auth/verify').then(function(response) {
                    setSessionUser(response.data);
                    return response.data;
                }, function() {
                    dropSessionUser();
                });
            }
        };
    }

    return authService;
});