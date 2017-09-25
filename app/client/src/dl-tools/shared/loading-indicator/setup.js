define([
    './indicator.directive'
], function(loadingIndicatorDirective) {
    return function(module) {
        module.directive('loadingIndicator', loadingIndicatorDirective);
        module.directive('spinner', loadingIndicatorDirective);
    };
});