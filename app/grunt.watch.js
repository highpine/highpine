module.exports = {
    options: {
        livereload: false
    },

    gruntfiles: {
        files: ['Gruntfile.js', 'grunt.*.js'],
        tasks: ['jshint:gruntfiles'],
        options: {
            livereload: false
        }
    },

    clientJs: {
        files: ['client/src/**/*.js'],
        tasks: [
            'jshint:client',
            'copy:clientJs',
            'replace',
            // todo: Uncomment ngAnnotate when fix support of ES6
            // 'ngAnnotate'
        ]
    },
    clientTpl: {
        files: ['client/src/**/*.tpl.html'],
        tasks: ['html2js']
    },
    styles: {
        files: ['client/src/**/*.less'],
        tasks: ['less']
    },
    vendor: {
        files: ['package.json', 'grunt.meta.js'],
        tasks: ['copy:clientVendor']
    }
};