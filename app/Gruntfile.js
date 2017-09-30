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
                dest: 'public/javascripts/compiled-templates.js',
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

        watch: watchConfig
    };

    grunt.initConfig(gruntConfig);

    grunt.registerTask('default', ['build']);

    grunt.registerTask('build', [
        'jshint',
        'clean',
        'copy',
        'replace',
        // todo: Uncomment ngAnnotate when fix support of ES6
        // 'ngAnnotate',
        'html2js',
        'less'
    ]);
};
