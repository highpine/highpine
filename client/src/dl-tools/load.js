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

    'dl-tools/components/auth/setup',
    'dl-tools/components/profile/setup',
    'dl-tools/components/person/setup'
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