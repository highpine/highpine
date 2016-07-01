define([], function() {
    /* @ngInject */
    function authService($http) {
        var userInfo = null;
        return {
            login: function(username, password) {
                return $http.post('/auth/login', {username: username, password: password})
                    .then(function(result) {
                        userInfo = result;
                    });
            },
            isLoggedIn: function() {
                return !!userInfo;
            },
            logout: function() {
                return $http.post('/auth/logout', {})
                    .then(function(result) {
                        userInfo = null;
                    });
            },
            verify: function() {
                return $http.get('/auth/verify');
            }
        };
    }

    return authService;
});