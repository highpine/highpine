define([], function() {
    /* @ngInject */
    return function($rootScope) {
        function broadcast(type, message, timeout) {
            $rootScope.$broadcast('alert', type, message, timeout);
        }
        return {
            primary: (message, timeout) => { broadcast('primary', message, timeout); },
            secondary: (message, timeout) => { broadcast('secondary', message, timeout); },
            success: (message, timeout) => { broadcast('success', message, timeout); },
            danger: (message, timeout) => { broadcast('danger', message, timeout); },
            warning: (message, timeout) => { broadcast('warning', message, timeout); },
            info: (message, timeout) => { broadcast('info', message, timeout); },
            light: (message, timeout) => { broadcast('light', message, timeout); },
            dark: (message, timeout) => { broadcast('dark', message, timeout); }
        };
    };
});