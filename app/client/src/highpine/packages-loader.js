define(() => (...setups) => {

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

    let dependencies = Array.prototype.reduce.call(setups, function(dependencies, setup) {
        let packageDependencies = typeof setup === 'function' ? [] : (setup.dependencies || []);
        return dependencies.concat(packageDependencies);
    }, []);

    return {
        init: init,
        run: run,
        angularDependencies: dependencies
    };
});