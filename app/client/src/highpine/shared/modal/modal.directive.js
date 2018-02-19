define(['jquery', 'bootstrap'], function($) {
    /* @ngInject */
    return function($compile) {

        return {
            link: function(scope, element, attrs) {

                let $modal = $(element).find('.modal');

                $modal.on('hide.bs.modal', () => {
                    if (typeof scope.onClose === 'function') {
                        scope.onClose();
                    }
                });
                $modal.on('hidden.bs.modal', () => {
                    $modal.find('.modal-title').html('');
                    $modal.find('.modal-body').html('');
                    delete scope.onConfirm;
                    delete scope.onCancel;
                    delete scope.onClose;
                });

                scope.$on('modal.confirm', (event, title, message, onConfirm, onCancel) => {
                    showModal('confirm', title, message, onConfirm, onCancel);
                });
                scope.$on('modal.alert', (event, title, message, onConfirm) => {
                    showModal('alert', title, message, onConfirm);
                });
                scope.$on('modal.popup', (event, title, message, onClose) => {
                    showModal('popup', title, message, null, null, onClose);
                });
                scope.$on('modal.close', () => closeModal());

                function showModal(mode, title, message, onConfirm = null, onCancel = null, onClose = null) {
                    scope.mode = mode;
                    scope.onConfirm = onConfirm;
                    scope.onCancel = onCancel;
                    scope.onClose = onClose;

                    $modal.find('.modal-title').html(title);
                    $modal.find('.modal-body').html(message);

                    $compile($modal)(scope);

                    $modal.modal();
                }

                function closeModal() {
                    $modal.modal('hide');
                }

            },
            scope: {},
            templateUrl: 'highpine/shared/modal/modal.tpl.html'
        };
    };
});