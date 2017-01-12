define([
    'angular',
    'highpine/module',
    'dl-tools/packages',
    'dl-tools/templates',
    'dl-tools/vendor-templates'
], function(angular, highpine, packages, templates, vendorTemplates) {

    let globalDependencies = [
        'dl-tools-templates',
        'dl-tools-vendor-templates',
        'highpine'
    ];

    let dlTools = angular.module('dlTools', [...globalDependencies,...packages.dependencies]);

    /*
     * Initializing components.
     */
    packages.init(dlTools);

    /*
     * Running the app.
     */
    /* @ngInject */
    dlTools.run(function ($rootScope, $state, $stateParams, $injector) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        /*
         * Running components.
         */
        packages.run(dlTools, $injector);
    });

    return dlTools;
});
