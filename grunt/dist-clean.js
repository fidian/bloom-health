module.exports = function (grunt) {
    "use strict";

    grunt.registerTask("dist-clean", [
        "clean",
        "clean-plugin:generated"
    ]);
};
