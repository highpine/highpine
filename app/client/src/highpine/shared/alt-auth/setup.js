define([
    './alt-auth.directive',
    './registry.service',
], function(altAuthDirective, altAuthRegistryFactory) {
    return {
        init(module) {
            module.directive('hpAltAuth', altAuthDirective);
            module.factory('HpAltAuthRegistry', altAuthRegistryFactory);
        }
    };
});