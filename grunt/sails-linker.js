module.exports = function (grunt) {
    'use strict';

    grunt.config('sails-linker', {
        "debug-css": {
            dest: "debug/debug.html",
            options: {
                endTag: "<!--STYLES END-->",
                fileTmpl: "<link rel=\"stylesheet\" href=\"%s\" />",
                startTag: "<!--STYLES-->"
            },
            src: [
                "<%= less['app-styles'].dest %>/**/*.css"
            ]
        },
        "debug-js": {
            dest: "debug/debug.html",
            src: [
                "<%= files.appThirdParty %>",
                "<%= files.appModules %>",
                "<%= files.appSpecial %>"
            ]
        }
    });
};
