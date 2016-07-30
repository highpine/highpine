var vendorClientPackages = [/** @clientPackages */];
var requireConfig = {
    paths: {
        'angular': '/vendor/angular/angular.min',
        'angular-route': '/vendor/angular-route/angular-route.min',
        'angular-resource': '/vendor/angular-resource/angular-resource.min',
        'angular-messages': '/vendor/angular-messages/angular-messages.min',
        'angular-ui-router': '/vendor/angular-ui-router/release/angular-ui-router.min',
        'ngstorage': '/vendor/ngstorage/ngStorage.min',
        'marked': '/vendor/marked/marked.min',
        'angular-marked': '/vendor/angular-marked/dist/angular-marked.min',
        'bootstrap': '/vendor/bootstrap/dist/js/bootstrap.min',
        'jquery': '/vendor/jquery/dist/jquery.min'
    },
    shim: {
        'angular': {'exports' : 'angular'},
        'angular-route': ['angular'],
        'angular-resource': ['angular'],
        'angular-messages': ['angular'],
        'angular-ui-router': ['angular'],
        'angular-marked': ['angular', 'marked'],
        'ngstorage': ['angular'],
        'bootstrap': ['jquery']
    },
    packages: [
        // shared
        {
            name: 'client-shared-fecru',
            location: 'dl-tools/shared/fecru',
            main: 'setup'
        }, {
            name: 'client-shared-jira',
            location: 'dl-tools/shared/jira',
            main: 'setup'
        }, {
            name: 'client-shared-gitlab',
            location: 'dl-tools/shared/gitlab',
            main: 'setup'
        }, {
            name: 'client-shared-auth',
            location: 'dl-tools/shared/auth',
            main: 'setup'
        }, {
            name: 'client-shared-data-services-manager',
            location: 'dl-tools/shared/data-services-manager',
            main: 'setup'
        }, {
            name: 'client-shared-jira-user-finder',
            location: 'dl-tools/shared/jira-user-finder',
            main: 'setup'
        },
        // components
        {
            name: 'dl-tools-dashboard',
            location: 'dl-tools/components/dashboard',
            main: 'setup'
        }, {
            name: 'dl-tools-auth',
            location: 'dl-tools/components/auth',
            main: 'setup'
        }, {
            name: 'dl-tools-person',
            location: 'dl-tools/components/person',
            main: 'setup'
        }, {
            name: 'dl-tools-profile',
            location: 'dl-tools/components/profile',
            main: 'setup'
        }
    ],
    //priority: [
    //    "angular"
    //],
    deps: [],
    baseUrl: '/javascripts'
};
requireConfig.packages = requireConfig.packages.concat(vendorClientPackages);
require.config(requireConfig);


require([
    'angular',
    'bootstrap',
    'dl-tools/module'
], function(angular) {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['DlTools']);
    });
});