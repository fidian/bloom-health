module.exports = function (grunt) {
    "use strict";

    grunt.registerTask("default", [
        // app.js
        "newer:jslint",
        "newer:ngtemplates",
        "newer:uglify",
        "newer:concat:app-js",

        // styles.css
        "newer:less",
        "newer:cssmin"
    ]);
};
