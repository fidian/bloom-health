module.exports = function (grunt) {
    'use strict';

    function config(override) {
        var result;

        result = {
            browsers: [
                'PhantomJS'
            ],
            frameworks: [
                'jasmine'
            ],
            options: {
                files: [
                    // Grunt is not handling the espansion of these files,
                    // so we can't use "<%= files.appThirdParty %>".  See
                    // grunt-karma issue #60.
                    'components/angular/angular.js',
                    'components/angular-mocks/angular-mocks.js',
                    'components/angular-local-storage/angular-local-storage.js',
                    'app/**/*.js'
                ]
            },
            plugins: [
                'karma-coverage',
                'karma-jasmine',
                'karma-phantomjs-launcher'
            ],
            reporters: [
                'progress'
            ],
            singleRun: true
        };

        if (override) {
            Object.keys(override).forEach(function (key) {
                result[key] = override[key];
            });
        }

        return result;
    }

    grunt.config('karma', {
        coverage: config({
            coverageReporter: {
                dir: 'debug/coverage/',
                type: 'html'
            },
            preprocessors: {
                'app/**/!(*spec).js': [
                    'coverage'
                ]
            },
            reporters: [
                'progress',
                'coverage'
            ]
        }),
        unit: config(),
        watch: config({
            singleRun: false,
            watch: true
        })
    });
};
