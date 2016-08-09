/**
 * To include a component the require module should return function
 * which accepts the global module as an argument:
 * define([], function() {
 *     return function(module) {
 *         module.config(..., ...);
 *         module.controller(..., ...);
 *         module.factory(..., ...);
 *         ...
 *     };
 * });
 */
define([
    'client-shared-auth',
    'client-shared-jira',
    'client-shared-fecru',
    'client-shared-gitlab',
    'client-shared-data-services-manager',
    'client-shared-jira-user-finder',
    'client-shared-loading-indicator',

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
            setup(module);
        });
    }
    return load;
});