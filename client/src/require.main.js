var vendorClientPackages = [/** @clientPackages */];
var components = [
    'app',
    'dashboard',
    'auth',
    'person',
    'profile',
    'project',
    'projects'
].map(function(component) {
    return {
        name: 'dl-tools-' + component,
        location: 'dl-tools/components/' + component,
        main: 'setup'
    };
});
var shared = [
    'auth',
    'alt-auth',
    'data-services-manager',
    'fecru',
    'gitlab',
    'jira',
    'jira-alt-auth-cookies',
    'jira-alt-auth-oauth',
    'jira-user-finder',
    'loading-indicator'
].map(function(component) {
    return {
        name: 'client-shared-' + component,
        location: 'dl-tools/shared/' + component,
        main: 'setup'
    };
});
var requireConfig = {
    paths: {
        'angular': '/vendor/angular/angular.min',
        'angular-route': '/vendor/angular-route/angular-route.min',
        'angular-resource': '/vendor/angular-resource/angular-resource.min',
        'angular-messages': '/vendor/angular-messages/angular-messages.min',
        'angular-ui-router': '/vendor/angular-ui-router/release/angular-ui-router.min',
        'ngstorage': '/vendor/ngstorage/ngStorage.min',
        'bootstrap': '/vendor/bootstrap/dist/js/bootstrap.min',
        'jquery': '/vendor/jquery/dist/jquery.min',
        'async': '/vendor/async/lib/async',
        'moment': '/vendor/moment/moment',
        'chart': '/vendor/chart.js/dist/Chart',
        'angular-chart': '/vendor/angular-chart.js/dist/angular-chart.min'
    },
    shim: {
        'angular': {exports: 'angular'},
        'angular-route': ['angular'],
        'angular-resource': ['angular'],
        'angular-messages': ['angular'],
        'angular-ui-router': ['angular'],
        'ngstorage': ['angular'],
        'angular-chart': ['angular', 'chart'],
        'bootstrap': ['jquery'],
        'moment': {exports: 'moment'},
        'chart': ['moment']
    },
    packages: components.concat(shared),
    //priority: [
    //    "angular"
    //],
    deps: [],
    baseUrl: '/javascripts',
    map: {
        // For all modules, if they ask for 'moment', use 'moment-adapter'
        '*': {
            'moment': 'moment-adapter'
        },
        // However, for moment-adapter, and moment/ modules, give them the
        // real 'moment*' modules.
        'moment-adapter': {
            'moment': 'moment'
        },
        'moment': {
            'moment': 'moment'
        }
    }
};
requireConfig.packages = requireConfig.packages.concat(vendorClientPackages);
require.config(requireConfig);

// Define this module inline after the two requirejs calls. Or, it could be defined
// in its own file, an just make it an anonymous define in that case, define(['moment...
/**
 * @see: https://github.com/requirejs/requirejs/issues/1554#issuecomment-226269905
 */
define('moment-adapter', ['moment'], function(moment) {
    moment.locale('en');
    window.moment = moment;
    return moment;
});

require([
    'angular',
    'bootstrap',
    'dl-tools/module'
], function(angular) {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['DlTools']);
    });
});