define([
    './alert.service',
    './alert.directive',
], function(alertServiceFactory, alertDirective) {
    return function(module) {
        module.factory('HpAlert', alertServiceFactory);
        module.directive('hpAlert', alertDirective);
    };
});