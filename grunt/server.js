module.exports = function (grunt) {
    'use strict';

    grunt.registerTask("server", [
        "connect",  // Start the web server
        "clean",  // Remove old built files, just in case
        "watch"  // Watch for changes
    ]);
};
