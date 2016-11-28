define([
    'ngstorage'
], function() {
    /* @ngInjinect */
    function authService($http, $sessionStorage, BACKEND_URL) {
        return {
            login: function(username, password) {
                return $http.post(BACKEND_URL + '/auth/login', {
                    username: username,
                    password: password
                })
                .then(function(result, data) {
                    $sessionStorage.user = result;
                    return result.data;
                });
            },
            isLoggedIn: function() {
                return !!$sessionStorage.user;
            },
            logout: function() {
                return $http.post(BACKEND_URL + '/auth/logout', {})
                    .then(function(result) {
                        delete $sessionStorage.user;
                        return result.data;
                    });
            },
            verify: function() {
                return $http.get('/auth/verify');
            }
        };
    }

    return authService;
});