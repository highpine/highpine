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
