define(['async'], function(async) {
    return {
        /* @ngInject */
        controller($scope, GitlabDataService) {

            const GitlabApiClient = GitlabDataService.getApiClient();

            function loadAllBranches(projectId, iterationCallback, finalCallback, page = 1, perPage = 100) {
                GitlabApiClient.projectBranches().query({
                    project_id: projectId,
                    per_page: perPage,
                    page: page
                }, branches => {
                    iterationCallback(branches);
                    if (branches.length < perPage) {
                        finalCallback();
                        return;
                    }
                    loadAllBranches(projectId, iterationCallback, finalCallback, page + 1)
                });
            }

            this.allBranchesLoaded = false;

            this.$onInit = function() {

                this.branches = [];

                loadAllBranches(this.project.id, branches => {
                    this.branches.push(...branches);
                }, () => {
                    this.mainBranch = this.branches.find(branch => branch.name === 'master') || this.branches[0];
                    this.allBranchesLoaded = true;
                });

            };

            this.deleteSelectedBranches = function() {

                // todo: Add confirmation dialog. Highlight unmerged branches that are going to be deleted.
                const $ctrl = this;
                let branchesToDelete = this.branches.filter(branch => branch.delete && branch !== this.mainBranch);
                if (!branchesToDelete.length) {
                    return;
                }
                async.eachLimit(branchesToDelete, 2, function(branch, callback) {
                    GitlabApiClient.projectBranch().delete({
                        project_id: $ctrl.project.id,
                        branch_name: branch.name
                    }, () => {
                        branch.deleted = true;
                        callback();
                    });
                }, function(err) {
                    if (err) {
                        // todo: show error message
                        console.log(err);
                        return;
                    }

                    $ctrl.branches = $ctrl.branches.filter(branch => !branch.deleted);
                });
            };

            this.preSelectForDeletion = function(branch, merged) {
                if (branch === this.mainBranch) {
                    branch.delete = false;
                    return;
                }
                branch.delete = merged;
            }

        },
        templateUrl: 'dl-tools/components/repository-branches-management/rpb.tpl.html',
        bindings: {
            project: '<'
        },
    };
});