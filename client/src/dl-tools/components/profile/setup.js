define([
    'dl-tools/components/profile/profile.controller'
], function(profileController) {
    return function(module) {
        /* @ngInject */
        module.config(function($stateProvider) {
            $stateProvider
                .state('profile', {
                    url: '/profile',
                    templateUrl: 'components/profile/profile.tpl.html',
                    controller: 'ProfileController'
                });
        });
        module.controller('ProfileController', profileController);
    };
});