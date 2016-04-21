define([],function(){
    /* @ngInject */
    function routes($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'components/auth/login.tpl.html',
                controller: 'AuthController'
            })
            .when('/profile', {
                templateUrl: 'components/profile/profile.tpl.html',
                controller: 'ProfileController'
            })
            .otherwise({redirectTo: '/login'});
    }

    return routes;
});