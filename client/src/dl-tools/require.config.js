define(['highpine/require.config'], function(customizeConfig) {
    return function(baseConfig) {
        baseConfig = customizeConfig(baseConfig);
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
            'loading-indicator'
        ].map(function (component) {
            return {
                name: 'client-shared-' + component,
                location: 'dl-tools/shared/' + component,
                main: 'setup'
            };
        });

        baseConfig.packages = (baseConfig.packages || []).concat(components.concat(shared));

        return baseConfig;
    }
});