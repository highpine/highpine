# Highpine — Grunt Tasks

## Jshint

Run jshint with [app/.jshintrc](app/.jshintrc) configuration over app javascript files.

```bash
grunt jshint # run all checks
grunt jshint:client # run checks over client files
grunt jshint:server # run checks over server files
grunt jshint:gruntfiles # run checks over grunt files
```

## Clean

Clean the `app/public` sub-directories for the client. 

```bash
grunt clean
```

## Copy

Copy the client files to `app/public` sub-directories.

```bash
grunt copy # copy all files
grunt copy:clientJs # copy javascript files from `app/client`
grunt copy:clientMedia # copy media files from `app/client`
grunt copy:clientVendor # copy client related vendor files
```

## ngAnnotate

Run `ng-annotate` over the client javascript files.

(!) Doesn't work correctly at the moment with ES6. Disabled for `build` task.

```bash
grunt ngAnnotate # annotate javascript files in `app/public`
```

## Html2js

Compile html templates from `app/client` to javascript file `app/public/javascripts/compiled-templates.js` 
to reduce requests for loading templates.  
Defines a `compiled-templates` angular module.

```
grunt html2js
```

## Less

Compile LESS files from `app/client` to CSS file `app/public/stylesheets/compiled-styles.css`.

```
grunt less
```

## Replace

Substitute some configuration from `grunt.meta.js` in `public/javascripts/config.js`.

```
grunt replace
```

## Watch

Start a grunt watcher, which will re-run appropriate commands when files changed.

```
grunt watch
```

## Build (default)

Run all commands to build the client.

```
grunt build
```