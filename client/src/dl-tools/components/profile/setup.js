define([
    'angular-ui-router',
    'dl-tools/components/profile/profile.controller'
], function(angularUiRouter, profileController) {
    return function(module) {
        /* @ngInject */
        module.config(function($stateProvider) {
            $stateProvider
                .state('profile', {
                    url: '/profile',
                    templateUrl: 'dl-tools/components/profile/profile.tpl.html',
                    controller: 'ProfileController',
                    data: {
                        documentTitle: 'Profile'
                    }
                });
        });
        module.controller('ProfileController', profileController);
    };
});