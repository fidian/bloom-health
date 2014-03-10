module.exports = function (grunt) {
    'use strict';

    grunt.registerTask("precommit", [
        "newer:jslint"
    ]);
};
