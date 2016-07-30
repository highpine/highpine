define([
    './finder.directive'
], function(jiraUserFinderDirective) {
    return function(module) {
        module.directive('jiraUserFinder', jiraUserFinderDirective);
    };
});