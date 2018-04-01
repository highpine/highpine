define([
    './finder.directive'
], function(gitlabProjectFinderDirective) {
    return function(module) {
        module.directive('gitlabProjectFinder', gitlabProjectFinderDirective);
    };
});