module.exports = function (grunt) {
    'use strict';

    grunt.config('clean-plugin', {
        build: [
            ".build"
        ],
        generated: [
            "<%= concat['app-js'].dest %>",
            "<%= cssmin['app-styles'].dest %>"
        ],
        "git-hooks": [
            "<%= copy['git-hooks'].dest %>"
        ]
    });
    grunt.renameTask("clean", "clean-plugin");
    grunt.registerTask("clean", [
        "clean-plugin:build",
        "newer-clean"
    ]);
};
