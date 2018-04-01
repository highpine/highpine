/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

/**
 * - 'require.config.compiled.js' will be compiled via Grunt by merging 'require.config.js' files into one.
 * - 'templates.compiled.js' will be compiled via Grunt from .html templates.
 */
require(['require.config.compiled'], function(requireConfig) {

    require.config(requireConfig);

    require([
        'angular',
        'bootstrap',
        'templates.compiled',
        requireConfig.app.path,
    ], function(angular) {
        angular.element(document).ready(function() {
            angular.bootstrap(document, [requireConfig.app.name]);
        });
    });
});