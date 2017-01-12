module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

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
                    src: ['client/src/**/*.js']
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
            build: {
                src: [
                    'public/stylesheets/*',
                    'public/javascripts/*',
                    'public/vendor/*'
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
            vendor: {
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
            dlTools: {
                options: {
                    base: 'client/src/dl-tools',
                    fileHeaderString: 'define([\'angular\'], function(angular) {',
                    fileFooterString: '});'
                },
                src: ['client/src/dl-tools/**/*.tpl.html'],
                dest: 'public/javascripts/dl-tools/templates.js',
                module: 'dl-tools-templates'
            },
            vendor: {
                options: {
                    base: '<%= meta.vendor.cwd %>',
                    fileHeaderString: 'define([\'angular\'], function(angular) {',
                    fileFooterString: '});'
                },
                src: ['<%= meta.vendor.tpl %>'],
                dest: 'public/javascripts/dl-tools/vendor-templates.js',
                module: 'dl-tools-vendor-templates'
            }
        },
        less: {
            build: {
                files: {
                    'public/stylesheets/dl-tools.css': 'client/src/dl-tools/styles.less'
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

        watch: watchConfig
    };

    grunt.initConfig(gruntConfig);

    grunt.registerTask('default', []);
    grunt.registerTask('build', [
        'default',
        'clean',
        'copy',
        'replace',
        'ngAnnotate',
        'html2js',
        'less'
        //'concat',
    ]);
};
