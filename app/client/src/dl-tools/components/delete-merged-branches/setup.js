define([
    'angular-ui-router',
    'dl-tools/components/delete-merged-branches/delete-merged-branches.component',
    'dl-tools/components/delete-merged-branches/branch/merged.component',
    'dl-tools/components/delete-merged-branches/branch/lazy-merged-detection.directive',
], function(
        angularUiRouter,
        deleteMergedBranchesComponent,
        branchMergedComponent,
        lazyMergedDetectionDirective
    ) {
        return {
            init(module) {
                module.component('deleteMergedBranches', deleteMergedBranchesComponent);
                module.component('branchMerged', branchMergedComponent);
                module.directive('lazyMergedDetection', lazyMergedDetectionDirective);
            }
        };
    });