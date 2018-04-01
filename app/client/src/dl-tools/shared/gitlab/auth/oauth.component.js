define([], function() {
    return {
        /* @ngInject */
        controller: function($state, BACKEND_URL) {
            this.auth = function() {

                let redirectUrl = this.returnTo;

                if (!redirectUrl) {
                    let stateToRedirectTo = $state.is('login') ? 'dashboard' : $state.current;
                    redirectUrl = $state.href(stateToRedirectTo, {}, {absolute: true});
                }

                window.location.href = BACKEND_URL + '/gitlab-auth/oauth?redirect=' + redirectUrl;
            };
        },
        template: '<button type="button" class="btn btn-primary" ng-click="$ctrl.auth()">Login with Gitlab (OAuth2)</button>',
        bindings: {
            returnTo: '@'
        }
    };
});