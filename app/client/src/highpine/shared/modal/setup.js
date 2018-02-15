define([
    './modal.service',
    './modal.directive',
], function(modalServiceFactory, modalDirective) {
    return function(module) {
        module.factory('HpModal', modalServiceFactory);
        module.directive('hpModal', modalDirective);
    };
});