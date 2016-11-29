/**
 * To include a component the requirejs module should return an object with two optional fields:
 * 1. 'dependencies' — an array of angular dependencies which will be added to global module's dependencies.
 * 2. 'init' — function which accepts the global module as an argument and initializes the package:
 *      define([], function() {
 *          return {
 *              dependencies: [...],
 *              init: function(module) {
 *                  module.config(..., ...);
 *                  module.controller(..., ...);
 *                  module.factory(..., ...);
 *                  ...
 *              };
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
    'client-shared-jira',
    'client-shared-fecru',
    'client-shared-gitlab',
    'client-shared-data-services-manager',
    'client-shared-jira-user-finder',
    'client-shared-loading-indicator',

    'dl-tools-app',
    'dl-tools-dashboard',
    'dl-tools-auth',
    'dl-tools-profile',
    'dl-tools-person',
    'dl-tools-project',
    'dl-tools-projects'
], function() {
    var setups = arguments;
    /* @ngInject */
    function load(module) {
        Array.prototype.forEach.call(setups, function(setup) {
            var init = typeof setup == 'function' ? setup : setup.init;
            init(module);
        });
    }
    var dependencies = Array.prototype.reduce.call(setups, function(dependencies, setup) {
        var packageDependencies = typeof setup == 'function' ? [] : (setup.dependencies || []);
        return dependencies.concat(packageDependencies);
    }, []);
    return {
        load:load,
        dependencies: dependencies
    };
});