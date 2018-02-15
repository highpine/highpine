define([], function() {
    /* @ngInject */
    return function($rootScope) {
        return {
            confirm(title, message, onConfirm, onCancel) {
                if (typeof message === 'undefined' || typeof message === 'function') {
                    onCancel = onConfirm;
                    onConfirm = message;
                    message = title;
                    title = '';
                }
                $rootScope.$broadcast('modal.confirm', title, message, onConfirm, onCancel);
            },
            alert(title, message, onConfirm) {
                if (typeof message === 'undefined' || typeof message === 'function') {
                    onConfirm = message;
                    message = title;
                    title = '';
                }
                $rootScope.$broadcast('modal.alert', title, message, onConfirm);
            }
        };
    };
});