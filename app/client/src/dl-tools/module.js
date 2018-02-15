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
    '@shared/gitlab-alt-auth-oauth',
    '@shared/gitlab-project-finder',
    '@shared/data-services-manager',
    '@shared/loading-indicator',
    '@shared/people',

    '@dl-tools/app',
    '@dl-tools/dashboard',
    '@dl-tools/auth',
    '@dl-tools/profile',
    '@dl-tools/people',
    '@dl-tools/import-people-from-jira',
    '@dl-tools/people-activity',
    '@dl-tools/person',
    '@dl-tools/project',
    '@dl-tools/projects',
    '@dl-tools/repositories',
    '@dl-tools/repository',
    '@dl-tools/delete-merged-branches',

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
    dlTools.run(function ($rootScope, $state, $injector, $transitions) {

        $rootScope.document = $rootScope.document || {};

        const defaultDocumentTitle = 'Highpine';

        $rootScope.document.title = defaultDocumentTitle;
        $transitions.onStart({}, transition => {
            let toState = transition.to();
            $rootScope.document.title = (toState.data && toState.data.documentTitle) || defaultDocumentTitle;
        });

        $rootScope.$state = $state;

        /*
         * Running components.
         */
        packages.run(dlTools, $injector);
    });

    return dlTools;
});
