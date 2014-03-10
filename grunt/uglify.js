module.exports = function (grunt) {
    'use strict';

    grunt.config('uglify', {
        "app-modules": {
            dest: ".build/uglify/app-modules/",
            expand: true,
            src: [
                "<%= files.appModules %>"
            ]
        },
        "app-special": {
            dest: ".build/uglify/app-special.js",
            src: [
                "<%= files.appSpecial %>"
            ]
        },
        "app-third-party": {
            dest: ".build/uglify/app-third-party.js",
            src: [
                "<%= files.appThirdParty %>"
            ]
        }
    });
};
