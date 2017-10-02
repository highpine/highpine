define([], function() {
    return function(baseConfig) {
        baseConfig.paths = Object.assign(baseConfig.paths, {
            'angular-route': '/vendor/angular-route/angular-route.min',
            'angular-resource': '/vendor/angular-resource/angular-resource.min',
            'angular-messages': '/vendor/angular-messages/angular-messages.min',
            'angular-ui-router': '/vendor/@uirouter/angularjs/release/angular-ui-router.min',
            'ngstorage': '/vendor/ngstorage/ngStorage.min',
            'async': '/vendor/async/lib/async',
            'moment': '/vendor/moment/moment',
            'moment-adapter': 'highpine/moment-adapter',
            'chart': '/vendor/chart.js/dist/Chart',
            'angular-chart': '/vendor/angular-chart.js/dist/angular-chart.min'
        });
        baseConfig.shim = Object.assign(baseConfig.shim, {
            'angular-route': ['angular'],
            'angular-resource': ['angular'],
            'angular-messages': ['angular'],
            'angular-ui-router': ['angular'],
            'ngstorage': ['angular'],
            'angular-chart': ['angular', 'chart'],
            'moment': {exports: 'moment'},
            'chart': ['moment']
        });
        // For all modules, if they ask for 'moment', use 'moment-adapter'
        baseConfig.map['*'] = Object.assign(baseConfig.map['*'] || {}, {
            'moment': 'moment-adapter'
        });
        baseConfig.map = Object.assign(baseConfig.map, {
            // However, for moment-adapter, and moment/ modules, give them the real 'moment*' modules.
            'moment-adapter': {
                'moment': 'moment'
            },
            'moment': {
                'moment': 'moment'
            }
        });

        return baseConfig;
    };
});