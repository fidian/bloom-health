module.exports = function (grunt) {
    'use strict';

    grunt.config('jslint', {
        all: {
            src: [
                'grunt/**/*.js',
                'Gruntfile.js',
                'lib/**/*.js',
                'package.json',
                'util/config/**/*.js'
            ],
            directives: {
                predef: [
                    'module',
                    'require'
                ]
            },
            options: {
                errorsOnly: true
            }
        }
    });
};
