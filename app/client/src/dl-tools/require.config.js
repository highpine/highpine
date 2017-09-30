define(['highpine/require.config'], function(customizeConfig) {
    return function(baseConfig) {
        baseConfig = customizeConfig(baseConfig);

        let shared = [
            'auth',
            'alt-auth',
            'data-services-manager',
            'fecru',
            'gitlab',
            'jira',
            'jira-alt-auth-cookies',
            'jira-alt-auth-oauth',
            'jira-user-finder',
            'loading-indicator',
            'people'
        ].map(function (component) {
            return {
                name: 'client-shared-' + component,
                location: 'dl-tools/shared/' + component,
                main: 'setup'
            };
        });

        let components = [
            'app',
            'dashboard',
            'auth',
            'person',
            'profile',
            'project',
            'projects'
        ].map(function (component) {
            return {
                name: 'dl-tools-' + component,
                location: 'dl-tools/components/' + component,
                main: 'setup'
            };
        });

        let vendor = [

        ].map(function(packageName) {
            return {
                name: packageName,
                location: '/vendor/' + packageName,
                main: 'setup'
            };
        });

        baseConfig.packages = [...(baseConfig.packages || []), ...shared, ...components, ...vendor];

        return baseConfig;
    };
});