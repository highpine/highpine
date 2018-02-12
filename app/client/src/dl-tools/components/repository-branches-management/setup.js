define([
    'angular-ui-router',
    'dl-tools/components/repository-branches-management/rpb.component',
    'dl-tools/components/repository-branches-management/branch/merged.component',
    'dl-tools/components/repository-branches-management/branch/lazy-merged-detection.directive',
], function(
        angularUiRouter,
        repositoryBranchesManagementComponent,
        branchMergedComponent,
        lazyMergedDetectionDirective
    ) {
        return {
            init(module) {
                module.component('repositoryBranchesManagement', repositoryBranchesManagementComponent);
                module.component('branchMerged', branchMergedComponent);
                module.directive('lazyMergedDetection', lazyMergedDetectionDirective);
            }
        };
    });