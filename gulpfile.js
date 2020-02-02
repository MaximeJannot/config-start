// Requis
var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano");
var browserSync = require("browser-sync").create();

// Put this after including our dependencies
var paths = {
    styles: {
        // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
        src: "src/css/*.scss",
        // Compiled files will end up in whichever folder it's found in (partials are not compiled)
        dest: "dist/css"
    }
};

function style() {
    // Where should gulp look for the sass files?
    // My .sass files are stored in the styles folder
    // (If you want to use scss files, simply look for *.scss files instead)
    return (
        gulp
            .src(paths.styles.src)
            // Use sass with the files found, and log any errors
            .pipe(sass())
            .on("error", sass.logError)
            // Use postcss with autoprefixer and compress the compiled file using cssnano
            .pipe(postcss([autoprefixer(), cssnano()]))
            // What is the destination for the compiled file?
            .pipe(gulp.dest(paths.styles.dest))
            // Add browsersync stream pipe after compilation
            .pipe(browserSync.stream())
    );
}
exports.style = style;

function reload() {
    browserSync.reload();
    done();
}

function watch(){
    browserSync.init({
    //     // You can tell browserSync to use this directory and serve it as a mini-server
        server: {
            baseDir: "./"
        }
    //     // If you are already serving your website locally using something like apache
    //     // You can use the proxy setting to proxy that instead
    //     // proxy: "yourlocal.dev"
    });
    // gulp.watch takes in the location of the files to watch for changes
    // and the name of the function we want to run on change
    gulp.watch(paths.styles.src, style);
    // We should tell gulp which files to watch to trigger the reload
    // This can be html or whatever you're using to develop your website
    // Note -- you can obviously add the path to the Paths object
    gulp.watch("*html", reload);
}
exports.watch = watch;