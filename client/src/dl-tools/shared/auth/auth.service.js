define([], function() {
    /* @ngInjinect */
    function authService($http, $sessionStorage) {
        return {
            login: function(username, password) {
                return $http.post('/auth/login', {
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
                return $http.post('/auth/logout', {})
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