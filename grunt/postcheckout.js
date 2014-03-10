module.exports = function (grunt) {
    'use strict';

    grunt.registerTask("postcheckout", [
        "setup",
        "default",
        "debug"
    ]);
};
