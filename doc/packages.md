## Highpine Packages

Highpine is divided into two parts: client and server.
Therefore there are two types of packages.

### Client packages

Client package is normally a require.js module, which extends 
the basic angular module.

#### Client package structure

Take a look at the [example client package](example/client-package) 
for it's structure and initialization.

#### Registering client package

At the moment you have to do the following steps to register 
the client package:

1. Create a package with setup.js file according to 
   [example setup.js](example/client-package/setup.js).
2. Add path to the package to [grunt.packages.js](grunt.packages.js)
3. Add package directory name to `components` or `shared` arrays respectively in
   [client/src/require.main.js](client/src/require.main.js)
4. Add package name to dependencies in 
   [client/src/dl-tools/packages.js](client/src/dl-tools/packages.js).
   See how the package name is defined in the require.main.js (step 3).
   
#### Setup client package

To include a component the requirejs module should return an object with three fields:
1. `dependencies` (optional) — an array of angular dependencies which will be added to global module's dependencies,
2. `init` — a function which accepts the global module as an argument and initializes the package,
3. `run` (optional) — a function which accepts the global module and Angular's `$injector` as arguments 
    and runs the package:

```javascript
define([], function() {
    return {
        dependencies: [...],
        init: function(module) {
            // Called before running the app.
            module.config(..., ...);
            module.controller(..., ...);
            module.factory(..., ...);
            ...
        },
        run: function(module, $injector) {
            // Called while running the app.
            // ...
        }
    };
});
```
For simple packages without any additional dependencies,
the requirejs module may return just an init function instead of an object:

```javascript
define([], function() {
    return function(module) {
        // Called before running the app.
        // ...
    };
});
```

### Server Packages

Server packages are mostly just a node modules.