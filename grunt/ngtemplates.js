module.exports = function (grunt) {
    'use strict';

    grunt.config('ngtemplates', {
        "app-templates": {
            dest: ".build/ngtemplates/app-templates.js",
            options: {
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                module: "app"
            },
            src: [
                "<%= files.appTemplates %>"
            ]
        }
    });
};
