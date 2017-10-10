define([
    'angular',
    'highpine/module',
    'dl-tools/packages'
], function(angular, highpine, packages, templates, vendorTemplates) {

    let dlTools = angular.module('dl-tools', ['highpine',...packages.dependencies]);

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
