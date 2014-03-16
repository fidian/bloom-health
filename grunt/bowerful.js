module.exports = function (grunt) {
    'use strict';

    grunt.config('bowerful', {
        dist: {
            packages: {
                angular: "~1.2.14",
                'angular-local-storage': "~0.0.1"
            }
        }
    });
};
