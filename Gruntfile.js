module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    var meta = require('./grunt.meta.js');
    var watchConfig = require('./grunt.watch.js');
    var gruntConfig = {
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
            vendor: {
                src: [
                    '<%= meta.vendor.js %>',
                    '<%= meta.vendor.css %>',
                    '<%= meta.vendor.fonts %>'
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
                    fileHeaderString: 'define([\'angular\'],function(angular){',
                    fileFooterString: '});'
                },
                src: ['client/src/dl-tools/**/*.tpl.html'],
                dest: 'public/javascripts/dl-tools/templates.js',
                module: 'dl-tools-templates'

            }
        },
        less: {
            build: {
                files: {
                    'public/stylesheets/dl-tools.css': 'client/src/dl-tools/styles.less'
                }
            }
        },

        //
        //concat: {
        //    options: {
        //        separator: ';\n'
        //    },
        //    tododo: {
        //        src: meta.tododo.concat_order.js.map(function(path) {
        //            return '<%= meta.dist %>/js/tododo/' + path;
        //        }),
        //        dest: '<%= meta.dist %>/js/tododo/tododo.all.js'
        //    }
        //},
        //


        watch: watchConfig
    };

    grunt.initConfig(gruntConfig);

    grunt.registerTask('default', []);
    grunt.registerTask('build', [
        'default',
        'clean',
        'copy',
        'ngAnnotate',
        'html2js',
        'less'
        //'concat',
    ]);
};
