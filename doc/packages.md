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

### Server Packages

Server packages are mostly just a node modules.