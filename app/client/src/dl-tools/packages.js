define([
    'client-shared-auth',
    'client-shared-alt-auth',

    'client-shared-jira',
    'client-shared-jira-alt-auth-cookies',
    'client-shared-jira-alt-auth-oauth',
    'client-shared-jira-user-finder',

    'client-shared-fecru',
    'client-shared-fecru-alt-auth-token',

    'client-shared-gitlab',

    'client-shared-data-services-manager',
    'client-shared-loading-indicator',
    'client-shared-people',

    'dl-tools-app',
    'dl-tools-dashboard',
    'dl-tools-auth',
    'dl-tools-profile',
    'dl-tools-person',
    'dl-tools-project',
    'dl-tools-projects'
], function(...setups) {

    function init(module) {
        setups.forEach(function(setup) {
            let init = typeof setup === 'function' ? setup : setup.init;
            init(module);
        });
    }

    function run(module, $injector) {
        setups.forEach(function(setup) {
            let run = typeof setup === 'object' ? setup.run : null;
            if (!run) {
                return;
            }
            run(module, $injector);
        });
    }

    let dependencies = setups.reduce(function(dependencies, setup) {
        let packageDependencies = typeof setup === 'function' ? [] : (setup.dependencies || []);
        return dependencies.concat(packageDependencies);
    }, []);

    return {
        init: init,
        run: run,
        dependencies: dependencies
    };
});