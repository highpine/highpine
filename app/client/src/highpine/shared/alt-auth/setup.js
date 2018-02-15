define([
    './alt-auth.directive',
    './alt-auth.registry'
], function(altAuthDirective, altAuthRegistry) {
    return {
        init(module) {
            module.directive('hpAltAuth', altAuthDirective);
        },
        registry: altAuthRegistry
    };
});