define([
    'angular-ui-router',
    'dl-tools/components/profile/profile.controller',
    'dl-tools/components/profile/edit-profile.controller'
], function(angularUiRouter, profileController, editProfileController) {
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
                })
                .state('profile/edit', {
                    url: '/profile/edit',
                    templateUrl: 'dl-tools/components/profile/edit-profile.tpl.html',
                    controller: 'EditProfileController',
                    data: {
                        documentTitle: 'Edit Profile'
                    }
                });
        });
        module.controller('ProfileController', profileController);
        module.controller('EditProfileController', editProfileController);
    };
});