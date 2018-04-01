define([
    'ngstorage'
], function() {
    /* @ngInject */
    function authService($http, $q, $sessionStorage, BACKEND_URL, UserStorage) {
        return {
            /**
             * @param {object} credentials Normally: { username: username, password: password }
             * @returns {Promise.<TResult>|Promise|*}
             */
            login: function(credentials) {
                return $http.post(BACKEND_URL + '/auth/login', credentials)
                    .then(function(response) {
                        UserStorage.update(response.data);
                        return response.data;
                    }, function(response) {
                        UserStorage.drop();
                        return $q.reject(response.data);
                    });
            },
            isLoggedIn: function() {
                return typeof UserStorage.get() !== 'undefined';
            },
            logout: function() {
                return $http.post(BACKEND_URL + '/auth/logout', {})
                    .then(function(response) {
                        UserStorage.drop();
                        return response.data;
                    }, function(response) {
                        return $q.reject(response.data);
                    });
            },
            verify: function() {
                return $http.get(BACKEND_URL + '/auth/verify').then(function(response) {
                    UserStorage.update(response.data);
                    return response.data;
                }, function(response) {
                    UserStorage.drop();
                    return $q.reject(response.data);
                });
            }
        };
    }

    return authService;
});