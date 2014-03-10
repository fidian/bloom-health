module.exports = function (grunt) {
    'use strict';

    grunt.registerTask("setup", [
        "clean-plugin:git-hooks",
        "copy:git-hooks",
        "default"
    ]);
};
