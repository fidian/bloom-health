module.exports = function (grunt) {
    'use strict';

    grunt.config('cssmin', {
        "app-styles": {
            dest: "www/styles.css",
            src: [
                "<%= less['app-styles'].dest %>/**/*.css"
            ]
        }
    });
};
