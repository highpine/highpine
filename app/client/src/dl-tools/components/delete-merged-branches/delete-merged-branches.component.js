define(['async'], function(async) {
    return {
        /* @ngInject */
        controller($scope, GitlabDataService, HpModal, HpAlert) {

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
                    loadAllBranches(projectId, iterationCallback, finalCallback, page + 1);
                });
            }

            function deleteBranches(projectId, branchesToDelete, callback) {
                async.eachLimit(branchesToDelete, 2, function(branch, branchCallback) {
                    GitlabApiClient.projectBranch().delete({
                        project_id: projectId,
                        branch_name: branch.name
                    }, () => {
                        branch.deleted = true;
                        branchCallback();
                    });
                }, callback);
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

            $scope.$watch('mainBranch', function() {
                if (!this.mainBranch) {
                    return;
                }
                this.mainBranch.delete = false;
            });

            this.updateBranchMerged = function(branch, merged) {
                branch.mergedCalculated = merged;
            };

            this.selectMergedBranches = function() {
                this.branches.filter(branch => branch.mergedCalculated)
                    .forEach(branch => {
                        branch.delete = (branch !== this.mainBranch); // select all except for main branch
                    });
            };

            this.deselectAllBranches = function() {
                this.branches.forEach(branch => branch.delete = false);
            };

            this.someBranchIsSelected = function() {
                return this.branches.some(branch => branch.delete);
            };

            this.deleteSelectedBranches = function() {
                let branchesToDelete = this.branches.filter(branch => branch.delete && branch !== this.mainBranch);
                if (!branchesToDelete.length) {
                    return;
                }

                const $ctrl = this;
                HpModal.confirm(
                    'Delete branches',
                    getDeletionConfirmationMessage(branchesToDelete),
                    function() {
                        deleteBranches($ctrl.project.id, branchesToDelete, (err) => {
                            $ctrl.branches = $ctrl.branches.filter(branch => !branch.deleted);

                            if (err) {
                                HpAlert.danger('An error happened while deleting branches. ' +
                                    'Not all branches might be deleted');
                                console.error(err);
                                return;
                            }

                            HpAlert.success('All selected branches were deleted.', 5000);
                        });
                    }
                );
            };

            function getDeletionConfirmationMessage(branchesToDelete) {
                let message = 'You are about to delete ';
                let unmergedBranchesToDelete = branchesToDelete.filter(branch => !branch.mergedCalculated);

                if (unmergedBranchesToDelete.length) {
                    if (unmergedBranchesToDelete.length === branchesToDelete.length) {
                        message += `<strong>${branchesToDelete.length} unmerged branches</strong>:`;
                    } else {
                        message += `${branchesToDelete.length} branches.<br /> Among them there are ` +
                            `<strong>${unmergedBranchesToDelete.length} unmerged branches</strong>:`;
                    }
                    message += '<ul>' +
                        unmergedBranchesToDelete.map(branch => `<li>${branch.name}</li>`).join('') +
                        '</ul>';
                } else {
                    message = `${branchesToDelete.length} merged branches. `;
                }

                message += 'Are you sure?';

                return message;
            }
        },
        templateUrl: 'dl-tools/components/delete-merged-branches/delete-merged-branches.tpl.html',
        bindings: {
            project: '<'
        },
    };
});