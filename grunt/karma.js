/*global process*/
module.exports = function (grunt) {
    'use strict';

    var sauceLaunchers;

    // Limit to 3 for a FOSS account
    sauceLaunchers = {
        win7Firefox: {
            base: 'SauceLabs',
            browserName: 'firefox',
            platform: 'Windows 7'
        },
        osx109Iphone: {
            base: 'SauceLabs',
            browserName: 'iphone',
            platform: 'OS X 10.9'
        },
        winxpIe8: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows XP',
            version: 8
        }
    };

    function config(override) {
        var result;

        result = {
            autoWatchBatchDelay: 1000,
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
                'karma-phantomjs-launcher',
                'karma-sauce-launcher'
            ],
            reporters: [
                'progress'
            ],
            sauceConfig: {
                accessKey: process.env.SAUCE_ACCESS_KEY,
                testName: 'bloom-health tests',
                username: process.env.SAUCE_USERNAME
            },
            singleRun: true
        };

        if (process.env.TRAVIS) {
            result.sauceConfig.build = 'Travis #' + process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BUILD_ID + ')';
            result.sauceConfig.startConnect = false;
            result.sauceConfig.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;

            // Remove this once websockets are supported by Sauce + Travis
            // See angularjs's karma.shared.conf
            result.transports = [
                'xhr-polling'
            ];
        }

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
        sauce: config({
            browserDisconnectTimeout: 10000,
            browserDisconnectTolerance: 2,
            browsersNoActivityTimeout: 20000,
            browsers: Object.keys(sauceLaunchers),
            captureTimeout: 120000,
            customLaunchers: sauceLaunchers,
            reporters: [
                'dots',
                'saucelabs'
            ]
        }),
        unit: config(),
        watch: config({
            singleRun: false,
            watch: true
        })
    });
};
