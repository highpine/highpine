define([], function() {
    /* @ngInject */
    function directive($compile) {
        var types = {
            inline: {
                template: '<img data-ng-show="config && flag" ' +
                    'data-ng-src="/media/dl-tools/shared/loading-indicator/images/loading-indicator.gif" />'
            },
            medium: {
                template: '<div data-ng-show="config && flag" class="loading-indicator-medium">' +
                    '<ul><li></li><li></li><li></li><li></li><li></li><li></li></ul></div>'
            },
            big: {
                template: '<div data-ng-show="config && flag" class="loading-indicator-big">' +
                    '<ul><li></li><li></li><li></li><li></li><li></li><li></li></ul></div>'
            }
        };
        return {
            scope: {
                flag: '=',
                type: '@'
            },
            /* @ngInject */
            controller: function($scope, $sce) {
                $scope.config = types[$scope.type] || null;
            },
            link: function (scope, element, attrs, controller) {
                var config = types[scope.type] || {};
                element.html('');
                element.append($compile(config.template || '')(scope));
            },
            template: ''
        };
    }

    return directive;
});