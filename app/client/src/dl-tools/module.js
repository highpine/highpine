define([
    'angular',
    'highpine/module',
    'highpine/packages-loader',

    // add module packages below

    '@shared/auth',
    '@shared/alt-auth',
    '@shared/jira',
    '@shared/jira-alt-auth-cookies',
    '@shared/jira-alt-auth-oauth',
    '@shared/jira-user-finder',
    '@shared/fecru',
    '@shared/fecru-alt-auth-token',
    '@shared/gitlab',
    '@shared/data-services-manager',
    '@shared/loading-indicator',
    '@shared/people',
    '@dl-tools/app',
    '@dl-tools/dashboard',
    '@dl-tools/auth',
    '@dl-tools/profile',
    '@dl-tools/person',
    '@dl-tools/project',
    '@dl-tools/projects'

], function(angular, highpine, packagesLoader, ...setups) {

    let packages = packagesLoader(...setups);
    let dlTools = angular.module('dl-tools', ['highpine', 'compiled-templates',...packages.angularDependencies]);

    /*
     * Initializing components.
     */
    packages.init(dlTools);

    /*
     * Running the app.
     */
    /* @ngInject */
    dlTools.run(function ($rootScope, $state, $injector) {

        $rootScope.document = $rootScope.document || {};

        let defaultDocumentTitle = 'Highpine';
        $rootScope.document.title = defaultDocumentTitle;
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            $rootScope.document.title = (toState.data ? toState.data.documentTitle : null) || defaultDocumentTitle;
        });

        $rootScope.$state = $state;
        // $rootScope.$stateParams = $transition$.params();

        /*
         * Running components.
         */
        packages.run(dlTools, $injector);
    });

    return dlTools;
});
