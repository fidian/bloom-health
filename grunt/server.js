module.exports = function (grunt) {
    'use strict';

    grunt.registerTask("server", [
        "connect",  // Start the web server
        "watch"  // Watch for changes
    ]);
};
