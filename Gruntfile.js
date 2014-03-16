module.exports = function (grunt) {
    'use strict';

    var files;

    files = {
        // 3rd party modules that are required first
        appThirdParty: [
            // The whole UI needs angular defined first
            "components/angular/angular.js",
            "components/angular-local-storage/angular-local-storage.js"
        ],

        // Our modules (directives, services, controllers, etc)
        appModules: [
            "app/**/*-module.js",  // Define modules first
            "app/**/*.js",
            "!app/**/*.spec.js"
        ],

        // Special handling for these files
        appSpecial: [
            // ngtemplates output - compiled/minified HTML templates
            ".build/ngtemplates/app-templates.js"
        ],

        // CSS files
        appStyles: [
            // Feeds into LESS preprocessor and a watch
            "app/**/*.less",
            "app/**/*.css"
        ],

        // Templates
        appTemplates: [
            // Feeds into ngtemplates and a watch
            "app/**/*.html"
        ]
    };

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        // Version of Angular.js, which is used for URLs, files, directories
        angularVersion: "1.2.14",
        files: files,
        pkg: grunt.file.readJSON("package.json")
    });
    grunt.loadTasks('grunt');
};
