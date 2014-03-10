module.exports = function (grunt) {
    'use strict';

    grunt.config('copy', {
        "git-hooks": {
            dest: ".git/hooks/",
            expand: true,
            flatten: true,
            options: {
                mode: true
            },
            src: "util/hooks/*"
        }
    });
};
