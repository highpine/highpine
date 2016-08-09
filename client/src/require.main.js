var vendorClientPackages = [/** @clientPackages */];
var components = [
    'dashboard',
    'auth',
    'person',
    'profile',
    'project',
    'projects'
];
var shared = [
    'auth',
    'data-services-manager',
    'fecru',
    'gitlab',
    'jira',
    'jira-user-finder',
    'loading-indicator'
];
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
        'jquery': '/vendor/jquery/dist/jquery.min',
        'async': '/vendor/async/lib/async'
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
    packages: components.map(function(component) {
            return {
                name: 'dl-tools-' + component,
                location: 'dl-tools/components/' + component,
                main: 'setup'
            };
        }).concat(shared.map(function(component) {
            return {
                name: 'client-shared-' + component,
                location: 'dl-tools/shared/' + component,
                main: 'setup'
            };
        })),
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