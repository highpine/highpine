define([], function() {
    return {
        /* @ngInject */
        controller: function($state, BACKEND_URL) {
            this.auth = function() {

                let stateToRedirectTo = $state.is('login') ? 'dashboard' : $state.current;
                let redirectUrl = $state.href(stateToRedirectTo, {}, {absolute: true});

                window.location.href = BACKEND_URL + '/gitlab-auth/oauth?redirect=' + redirectUrl;
            };
        },
        template: '<button type="button" class="btn btn-primary" ng-click="$ctrl.auth()">Login with Gitlab (OAuth2)</button>'
    };
});