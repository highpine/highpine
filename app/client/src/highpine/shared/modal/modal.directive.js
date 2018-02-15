define(['jquery', 'bootstrap'], function($) {
    /* @ngInject */
    return function($compile, $sce) {

        return {
            link: function(scope, element, attrs) {

                let $modal = $(element).find('.modal');

                $modal.on('hidden.bs.modal', event => {
                    delete scope.onConfirm;
                    delete scope.onCancel;
                    delete scope.title;
                    delete scope.message;
                });

                scope.$on('modal.confirm', function(event, title, message, onConfirm, onCancel) {
                    showModal('confirm', title, message, onConfirm, onCancel);
                });
                scope.$on('modal.alert', function(event, title, message, onConfirm) {
                    showModal('alert', title, message, onConfirm);
                });

                function showModal(mode, title, message, onConfirm, onCancel) {
                    scope.mode = mode;
                    scope.title = $sce.trustAsHtml(title);
                    scope.message = $sce.trustAsHtml(message);
                    scope.onConfirm = onConfirm;
                    scope.onCancel = onCancel;

                    $modal.modal();
                }
            },
            scope: {},
            templateUrl: 'highpine/shared/modal/modal.tpl.html'
        };
    };
});