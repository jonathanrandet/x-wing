module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            files: ['build'],
        },
        jshint: {
            options: {
                jshintrc: true,
            },
            all: ['Gruntfile.js', 'src/**/*.js']
        },
        karma: {
            unit: {
                configFile: './test/karma.conf.js',
            },
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: './src/',
                        src: ['**/*', '!static/config.rb','!static/sass', '!static/sass/*', '!.sass-cache/'],
                        dest: './build/',
                    }
                ]
            }
        },
        compass: {
            build: {
                options: {
                    config: 'src/static/config.rb',
                },
            },
        },
        watch: {
            css: {
                cwd: 'static/sass/',
                files: '*.scss',
                tasks: ['compass'],
                options: {
                    livereload: true,
                },
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-compass');
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    
    grunt.registerTask('test', ['simplemocha', 'karma']);
    grunt.registerTask('dev',['clean', 'jshint', 'compass', 'copy:main', 'karma:unit']);
    grunt.registerTask('default', ['clean', 'jshint', 'compass', 'copy:main']);
    
};