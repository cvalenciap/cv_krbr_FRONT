var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    wrap = require('gulp-wrap'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    minifyCss = require('gulp-minify-css'),
    minifyJs = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    minifyHTML = require('gulp-minify-html'),
    sprockets = require('gulp-sprockets');

var paths_core = {
    js_index: 'vendor/scripts/vendor.js',
    css_index: 'vendor/stylesheets/template.css',
    scripts: 'vendor/scripts/**/*.*',
    json: 'vendor/json/**/*.*',
    stylesheets: 'vendor/stylesheets/**/*.*',
    images: 'vendor/images/**/*.*',
    fonts: 'vendor/fonts/**/*.*'
};

var paths = {
    scripts: 'src/js/**/*.*',
    stylesheets: 'src/css/**/*.*',
    images: 'src/img/**/*.*',
    templates: 'src/templates/**/*.html',
    index: 'src/index.html',
    bower_fonts: 'bower_components/**/*.{ttf,woff,eof,svg,woff2}',
    config: ["env.js", "Web.config", "favicon.ico"]
};

var paths_js = {
    app : 'src/js/app.js',
    ctrls : 'src/js/controllers/**/*.*',
    conf : 'src/js/config/*.*',
    directives : 'src/js/directives/**/*.*',
    services : 'src/js/services/**/*.*',
    utils : 'src/js/utils/*.*'
};

var paths_dist = {
    root : 'dist',
    scripts : 'dist/js',
    stylesheets : 'dist/css',
    fonts : 'dist/fonts',
    images : 'dist/img',
    templates : 'dist/templates',
    watch: 'dist/**/*.*'
};

/**
 * Template assets
 */
gulp.task('build-template', ['template-images', 'template-fonts', 'template-styles', 'template-scripts', 'template-json']);
sprockets.default.declare({
    app: './',
    javascripts: ['vendor/scripts'],
    stylesheets: ['vendor/stylesheets']
}, paths_dist.root);

gulp.task('template-styles', function () {
    return gulp.src(paths_core.css_index)
        .pipe(sprockets.default.css())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths_dist.stylesheets));
});

gulp.task('template-scripts', function() {
    return gulp.src(paths_core.js_index)
        .pipe(sprockets.default.js())
        .pipe(gulp.dest(paths_dist.scripts));
});

gulp.task('template-images', function() {
    return gulp.src(paths_core.images)
        .pipe(gulp.dest(paths_dist.images))
});

gulp.task('template-fonts', function() {
    return gulp.src(paths_core.fonts)
        .pipe(gulp.dest(paths_dist.fonts))
});

gulp.task('template-json', function() {
    return gulp.src(paths_core.json)
        .pipe(gulp.dest(paths_dist.scripts))
});

/**
 * Handle bower components from index
 */
gulp.task('usemin', function() {
    return gulp.src(paths.index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [minifyCss({keepSpecialComments: 0}), 'concat']
        }))
        .pipe(gulp.dest(paths_dist.root));
});

/**
 * Copy assets
 */
gulp.task('build-assets', ['copy-bower_fonts']);

gulp.task('copy-bower_fonts', function() {
    return gulp.src(paths.bower_fonts)
        .pipe(rename({
            dirname: '/'
        }))
        .pipe(gulp.dest(paths_dist.fonts));
});

/**
 * Handle custom files
 */
gulp.task('build-custom', ['custom-images', 'custom-js', 'custom-styles', 'custom-templates','custom-config']);

gulp.task('custom-images', function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths_dist.images));
});

gulp.task('custom-js', function() {
    return gulp.src([paths_js.app,paths_js.conf,paths_js.utils,paths_js.services,paths_js.directives,paths_js.ctrls])
        .pipe(minifyJs())
        .pipe(concat('application.min.js'))
        .pipe(gulp.dest(paths_dist.scripts));
});

gulp.task('custom-styles', function() {
    return gulp.src(paths.stylesheets)
        .pipe(gulp.dest(paths_dist.stylesheets));
});

gulp.task('custom-templates', function() {
    return gulp.src(paths.templates)
        .pipe(minifyHTML())
        .pipe(gulp.dest(paths_dist.templates));
});

gulp.task('custom-config', function () {
    return gulp.src(paths.config)
        .pipe(gulp.dest(paths_dist.root));
});

/**
 * Watch custom files
 */
gulp.task('watch', ['build'], function() {
    gulp.watch([paths_core.scripts], ['template-scripts']);
    gulp.watch([paths_core.stylesheets], ['template-styles']);
    gulp.watch([paths_core.images], ['template-images']);
    gulp.watch([paths.images], ['custom-images']);
    gulp.watch([paths.stylesheets], ['custom-styles']);
    gulp.watch([paths.scripts], ['custom-js']);
    gulp.watch([paths.templates], ['custom-templates']);
    gulp.watch([paths.index], ['usemin']);
});

/**
 * Live reload server
 */
gulp.task('webserver', ['build'], function() {
    connect.server({
        root: paths_dist.root,
        livereload: true,
        port: 8888
    });
});

gulp.task('livereload', ['webserver'], function() {
    gulp.src([paths_dist.watch])
        .pipe(watch([paths_dist.watch]))
        .pipe(connect.reload());
});

/**
 * Gulp tasks
 */
gulp.task('build', ['usemin', 'build-template', 'build-assets', 'build-custom']);
gulp.task('default', ['build', 'webserver', 'livereload', 'watch']);