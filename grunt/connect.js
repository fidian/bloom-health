module.exports = function (grunt) {
    'use strict';

    grunt.config('connect', {
        default: {
            options: {
                base: [
                    "debug",
                    "",
                    "www"
                ],
                port: 8080
            }
        }
    });
};
