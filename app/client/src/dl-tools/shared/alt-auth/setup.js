define([
    'dl-tools/shared/alt-auth/alt-auth.directive',
    'dl-tools/shared/alt-auth/alt-auth.registry'
], function(altAuthDirective, altAuthRegistry) {
    var setup = function(module) {
        module.directive('altAuth', altAuthDirective);
    };
    setup.registry = altAuthRegistry;
    return setup;
});