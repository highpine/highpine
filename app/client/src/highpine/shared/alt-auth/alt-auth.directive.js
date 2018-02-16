define([
    'jquery',
    './alt-auth.registry'
], function($, altAuthRegistry) {
    /* @ngInject */
    function alternativeAuthorizationDirective($compile, HpAltAuthRegistry) {
        return {
            scope: {},
            link: function(scope, element, attrs) {

                let $authMethodsContainer = $(element).find('.alt-auth-methods-container');

                HpAltAuthRegistry.getAll()
                    .forEach(function(authMethod) {
                        $authMethodsContainer.append(
                            `<div class="card mb-3"><div class="card-body"><${authMethod}></${authMethod}></div></div>`
                        );
                    });

                $compile(element.contents())(scope);
            },
            template: '<div class="alt-auth-methods-container"></div>'
        };
    }

    return alternativeAuthorizationDirective;
});