module.exports = function (grunt) {
    'use strict';

    grunt.config("concat", {
        "app-js": {
            dest: "www/app.js",
            src: [
                // Need third party code first for Angular
                "<%= uglify['app-third-party'].dest %>",
                "<%= uglify['app-modules'].dest %>/**/*.js",
                "<%= uglify['app-special'].dest %>"
            ]
        }
    });
};
