module.exports = function (grunt) {

    // Load tasks from node_modules
    require('load-grunt-tasks')(grunt);
    // Load custom tasks from 'grunt/tasks'
    grunt.loadTasks('./grunt/tasks');

    let meta = require('./grunt.meta.js');
    let watchConfig = require('./grunt.watch.js');

    let gruntConfig = {
        meta: meta,
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                force: true, // Don't fail the task, just warn
                ignores: []
            },
            client: {
                files: {
                        src: ['client/**/*.js']
                }
            },
            server: {
                files: {
                    src: ['server/**/*.js']
                }
            },
            gruntfiles: {
                files: {
                    src: ['Gruntfile.js', 'grunt.*.js']
                }
            }
        },
        clean: {
            beforeBuild: {
                src: [
                    'public/stylesheets/*',
                    'public/javascripts/*',
                    'public/vendor/*'
                ]
            },
            afterBuild: {
                src: [
                    'public/javascripts/**/require.config.js',
                    'public/javascripts/require.config.packages.compiled.js',
                ]
            }
        },
        copy: {
            clientJs: {
                src: ['**/*.js'],
                dest: 'public/javascripts',
                cwd: 'client/src',
                expand: true
            },
            clientMedia: {
                src: ['**/*.gif', '**/*.png', '**/*.jpg', '**/*.svg', '**/*.ico'],
                dest: 'public/media',
                cwd: 'client/src',
                expand: true
            },
            clientVendor: {
                src: [
                    '<%= meta.vendor.js %>',
                    '<%= meta.vendor.css %>',
                    '<%= meta.vendor.fonts %>',
                ],
                dest: 'public/vendor',
                cwd: '<%= meta.vendor.cwd %>',
                expand: true
            }
        },
        ngAnnotate: {
            public: {
                files: [{
                    src: ['**/*.js'],
                    dest: 'public/javascripts',
                    cwd: 'public/javascripts',
                    expand: true
                }]
            }
        },
        html2js: {
            all: {
                options: {
                    base: 'client/src',
                    fileHeaderString: 'define([\'angular\'], function(angular) {',
                    fileFooterString: '});'
                },
                src: ['client/**/*.tpl.html'],
                dest: 'public/javascripts/templates.compiled.js',
                module: 'compiled-templates'
            },
            // vendor: {
            //     options: {
            //         base: '<%= meta.vendor.cwd %>',
            //         fileHeaderString: 'define([\'angular\'], function(angular) {',
            //         fileFooterString: '});'
            //     },
            //     src: ['<%= meta.vendor.tpl %>'],
            //     dest: 'public/javascripts/dl-tools/vendor-templates.js',
            //     module: 'dl-tools-vendor-templates'
            // }
        },
        less: {
            build: {
                files: {
                    'public/stylesheets/compiled-styles.css': 'client/**/*/styles.less'
                }
            }
        },

        replace: {
            appConfig: {
                options: {
                    patterns: [{
                        match: 'backendUrl',
                        replacement: meta.backendUrl
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['public/javascripts/config.js'],
                    dest: 'public/javascripts'
                }]
            }
        },

        'compile-requirejs-config': {
            client: {
                src: [
                    'client/src/require.config',
                    'client/src/highpine/require.config',
                    'client/src/dl-tools/require.config',
                    'public/javascripts/require.config.packages.compiled'
                ],
                dest: 'public/javascripts/require.config.compiled.js'
            }
        },
        'compile-requirejs-packages-map': {
            all: {
                files: [{
                    cwd: 'client/src',
                    src: ['highpine/shared/*'],
                    namespace: '@shared',
                    main: 'setup'
                }, {
                    cwd: 'client/src',
                    src: ['highpine/components/*'],
                    namespace: '@highpine',
                    main: 'setup'
                }, {
                    cwd: 'client/src',
                    src: ['dl-tools/shared/*'],
                    namespace: '@shared',
                    main: 'setup'
                }, {
                    cwd: 'client/src',
                    src: ['dl-tools/components/*'],
                    namespace: '@dl-tools',
                    main: 'setup'
                }, {
                    cwd: 'node_modules',
                    src: [
                        'client-shared-fecru',
                    ],
                    pathPrefix: '/vendor/',
                    main: 'setup'
                }],
                destination: 'public/javascripts/require.config.packages.compiled.js'
            },
        },

        watch: watchConfig
    };

    grunt.initConfig(gruntConfig);

    grunt.registerTask('default', ['build']);

    grunt.registerTask('build', [
        'jshint',
        'clean:beforeBuild',
        'copy',
        'replace',
        'compile-requirejs-packages-map',
        'compile-requirejs-config',
        // todo: Uncomment ngAnnotate when fix support of ES6
        // 'ngAnnotate',
        'html2js',
        'less',
        'clean:afterBuild',
    ]);
};
