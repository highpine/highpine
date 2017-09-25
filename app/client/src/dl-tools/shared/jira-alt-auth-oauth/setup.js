define([
    'client-shared-alt-auth'
], function(altAuth) {
    return {
        init: function(module) {
        },
        run: function(module, $injector) {
            function getLocationOrigin() {
                return window.location.origin || window.location.protocol + '//' + window.location.host;
            }
            altAuth.registry.registerService({
                getLoginButtonTitle: function() {
                    return 'Login with Jira OAuth';
                },
                clickCallback: function() {
                    window.location.href = $injector.get('BACKEND_URL') + '/jira-auth/oauth' +
                        '?redirect=' + getLocationOrigin();
                }
            });
        }
    };
});