module.exports = function (grunt) {
    'use strict';

    grunt.config('watch', {
        app: {
            files: [
                "<%= files.appThirdParty %>",
                "<%= files.appModules %>",
                "<%= files.appSpecial %>"
            ],
            tasks: [
                "default",
                "debug"
            ]
        },
        options: {
            atBegin: true
        },
        templates: {
            files: [
                "<%= files.appTemplates %>",
                "<%= files.appStyles %>"
            ],
            tasks: [
                "default",
                "debug"
            ]
        }
    });
};
