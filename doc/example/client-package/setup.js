/**
 * Configure the require.js to know about additional third-party packages.
 * Node modules are deployed to 'vendor' folder by grunt.
 */
require.config({
    paths: {
        'third-party-package-x': '/vendor/[path to package relative to node_modules]'
    },
    shim: {
        'third-party-package-x': ['angular']
    }
});

/**
 * Define the package 'setup' module.
 * See client/src/dl-tools/packages.js for details.
 */
define([
    'angular-ui-router',
    'third-party-package-x',
    '[path to this package relative to `client/src`]/client-package.controller'
], function(
        angularUiRouter,
        thirdPartyPackageX,
        controller,
        directive,
        service
    ) {
        return {
            dependencies: [
                'third-party-package-x-ng-module'
            ],
            init: function(module) {
                /* @ngInject */
                module.config(function() {
                    // whatever
                });
                // define controllers, directives, services or whatever
                module.controller('ExamplePackageController', controller);
            }
        };
});