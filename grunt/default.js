module.exports = function (grunt) {
    "use strict";

    grunt.registerTask("default", [
        "newer:jslint",
        "bowerful",

        // app.js
        "newer:ngtemplates",
        "newer:uglify",
        "newer:concat:app-js",

        // styles.css
        "newer:less",
        "newer:cssmin"
    ]);
};
