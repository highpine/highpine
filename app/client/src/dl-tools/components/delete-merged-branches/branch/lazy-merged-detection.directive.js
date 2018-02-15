define(['waypoints'], function() {
    /* @ngInject */
    return function($compile) {
        return {
            link: function(scope, element, attrs) {
                $(element).waypoint({
                    handler: function(direction) {
                        let $element = $(this.element);
                        if ($element.data('merged-added')) {
                            return;
                        }
                        $element.data('merged-added', true);
                        const html = $compile('<branch-merged project="$ctrl.project" ' +
                            'branch="branch" ' +
                            'main-branch="$ctrl.mainBranch" ' +
                            'on-update="$ctrl.updateBranchMerged(branch, merged)"></branch-merged>')(scope);
                        $element.find('.merged-state-container').html(html);
                    },
                    offset: '110%'
                });
            }
        };
    };
});