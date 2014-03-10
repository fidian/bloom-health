module.exports = function (grunt) {
    'use strict';

    grunt.config('less', {
        "app-styles": {
            dest: ".build/less/app-styles/",
            expand: true,
            ext: ".css",
            src: [
                "<%= files.appStyles %>"
            ]
        }
    });
};
