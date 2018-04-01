define(['jquery'], function($) {
    /* @ngInject */
    return function($sce) {

        return {
            link(scope, element, attrs) {

                let $alert = $(element).find('.alert');

                $alert.on('close.bs.alert', function(event) {
                    // In default behavior element is removed from the DOM.
                    event.preventDefault();
                    $alert.fadeOut(250, () => {
                        scope.type = '';
                        scope.message = '';
                        scope.$apply();
                        // Return display control to Angular
                        $alert.attr('style', null);
                    });
                });

                scope.$on('alert', function(event, type, message, timeout) {
                    scope.type = type;
                    scope.message = $sce.trustAsHtml(message);
                    if (timeout) {
                        setTimeout(() => $alert.alert('close'), timeout);
                    }
                });
            },
            scope: {},
            templateUrl: 'highpine/shared/alert/alert.tpl.html'
        };
    };
});