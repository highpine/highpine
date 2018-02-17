define(['jquery', 'bootstrap'], function($) {
    /* @ngInject */
    return function($compile) {

        return {
            link: function(scope, element, attrs) {

                let $modal = $(element).find('.modal');

                $modal.on('hidden.bs.modal', event => {
                    delete scope.onConfirm;
                    delete scope.onCancel;
                });

                scope.$on('modal.confirm', function(event, title, message, onConfirm, onCancel) {
                    showModal('confirm', title, message, onConfirm, onCancel);
                });
                scope.$on('modal.alert', function(event, title, message, onConfirm) {
                    showModal('alert', title, message, onConfirm);
                });

                function showModal(mode, title, message, onConfirm, onCancel) {
                    scope.mode = mode;
                    scope.onConfirm = onConfirm;
                    scope.onCancel = onCancel;

                    $modal.find('.modal-title').html(title);
                    $modal.find('.modal-body').html(message);

                    $compile($modal)(scope);

                    $modal.modal();
                }
            },
            scope: {},
            templateUrl: 'highpine/shared/modal/modal.tpl.html'
        };
    };
});