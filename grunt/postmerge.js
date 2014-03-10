module.exports = function (grunt) {
    'use strict';

    grunt.registerTask("postmerge", [
        "setup",
        "default",
        "debug"
    ]);
};
