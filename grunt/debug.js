module.exports = function (grunt) {
    "use strict";

    grunt.registerTask("debug", [
        "newer:sails-linker:debug-js",
        "newer:sails-linker:debug-css"
    ]);
};
