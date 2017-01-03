/**
 * To include a component the requirejs module should return an object with three fields:
 * 1. 'dependencies' (optional) — an array of angular dependencies which will be added to global module's dependencies,
 * 2. 'init' — function which accepts the global module as an argument and initializes the package,
 * 3. 'run' — function which accepts the global module and Angular's $injector as arguments and runs the package:
 *      define([], function() {
 *          return {
 *              dependencies: [...],
 *              init: function(module) {
 *                  // Called before running the app.
 *                  module.config(..., ...);
 *                  module.controller(..., ...);
 *                  module.factory(..., ...);
 *                  ...
 *              },
 *              run: function(module, $injector) {
 *                  // Called while running the app.
 *                  // ...
 *              }
 *          };
 *      });
 * If the package doesn't have any additional dependencies,
 * the requirejs module may return just an init function instead of object:
 *      define([], function() {
 *          return function(module) {
 *              ...
 *          };
 *      });
 */
define([
    'client-shared-auth',
    'client-shared-alt-auth',
    'client-shared-jira',
    'client-shared-jira-alt-auth-cookies',
    'client-shared-jira-alt-auth-oauth',
    'client-shared-jira-user-finder',
    'client-shared-fecru',
    'client-shared-gitlab',
    'client-shared-data-services-manager',
    'client-shared-loading-indicator',

    'dl-tools-app',
    'dl-tools-dashboard',
    'dl-tools-auth',
    'dl-tools-profile',
    'dl-tools-person',
    'dl-tools-project',
    'dl-tools-projects'
], function() {

    let setups = arguments;

    function forEachSetup(callback) {
        return Array.prototype.forEach.call(setups, callback);
    }

    function load(module) {
        forEachSetup(function(setup) {
            let init = typeof setup === 'function' ? setup : setup.init;
            init(module);
        });
    }

    function run(module, $injector) {
        forEachSetup(function(setup) {
            let run = typeof setup === 'object' ? setup.run : null;
            if (!run) {
                return;
            }
            run(module, $injector);
        });
    }

    let dependencies = Array.prototype.reduce.call(setups, function(dependencies, setup) {
        let packageDependencies = typeof setup === 'function' ? [] : (setup.dependencies || []);
        return dependencies.concat(packageDependencies);
    }, []);

    return {
        load: load,
        run: run,
        dependencies: dependencies
    };
});