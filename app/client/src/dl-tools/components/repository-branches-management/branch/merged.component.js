define([], function() {
    return {
        /* @ngInject */
        controller($scope, GitlabDataService) {

            const GitlabApiClient = GitlabDataService.getApiClient();

            this.$onChanges = function() {

                if (!this.mainBranch) {
                    return;
                }

                this.merged = undefined;

                const lastCommit = this.branch.commit;
                const lastCommitDate = new Date(lastCommit.created_at);

                GitlabApiClient.projectCommits().query({
                    project_id: this.project.id,
                    per_page: 100,
                    ref_name: this.mainBranch.name,
                    since: lastCommitDate.toISOString(),
                    until: lastCommitDate.toISOString()
                }, commits => {
                    this.merged = !! commits.find(commit => commit.id === lastCommit.id);
                    this.onUpdate({merged: this.merged});
                });
            }
        },
        templateUrl: 'dl-tools/components/repository-branches-management/branch/merged.tpl.html',
        bindings: {
            project: '<',
            branch: '<',
            mainBranch: '<',
            onUpdate: '&'
        },
    };
});