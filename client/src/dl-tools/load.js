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
    'dl-tools/shared/auth/setup',
    'dl-tools/shared/jira-api/setup',
    'dl-tools/shared/data-services-manager/setup',

    'dl-tools/components/auth/setup',
    'dl-tools/components/profile/setup'
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