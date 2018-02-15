define([
    './alt-auth.registry'
], function(altAuthRegistry) {
    /* @ngInject */
    function alternativeAuthorizationDirective($compile) {
        return {
            scope: {},
            link: function(scope, element, attrs) {
                let $formsContainer = $(element).find('.alt-auth-forms-container');
                altAuthRegistry.services.forEach(function(service) {
                    if (typeof service.getDirectiveName !== 'function' || !service.getDirectiveName()) {
                        return;
                    }
                    let serviceDirectiveName = service.getDirectiveName();
                    $formsContainer.append(
                        '<div class="alt-auth-service-form ' + serviceDirectiveName + '"' +
                            ' data-ng-show="shownServiceForm == \'' + serviceDirectiveName + '\'">' +
                            '<div data-' + serviceDirectiveName + '></div>' +
                            '<span class="glyphicon glyphicon-remove close-button" aria-hidden="true" ' +
                                'data-ng-click="hideServiceForm()"></span>' +
                        '</div>'
                    );
                });
                $compile(element.contents())(scope);
            },
            /* @ngInject */
            controller: function($scope, $sce) {
                $scope.services = altAuthRegistry.services;
                $scope.shownServiceForm = null;
                $scope.showServiceForm = function(service) {
                    $scope.hideServiceForm();
                    if (typeof service.clickCallback === 'function') {
                        service.clickCallback();
                    } else {
                        $scope.shownServiceForm = service.getDirectiveName();
                    }
                };
                $scope.hideServiceForm = function() {
                    $scope.shownServiceForm = null;
                };
            },
            templateUrl: 'highpine/shared/alt-auth/alt-auth.tpl.html'
        };
    }

    return alternativeAuthorizationDirective;
});