/*---------------------------
 |
 |
 |   NodeJs requirements
 |
 ----------------------------*/

var gulp = require("gulp");
var shell = require("gulp-shell");
var elixir = require('laravel-elixir');

var templateCache = require('gulp-angular-templatecache');

var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');


/**
 *
 * Used in defining vendor js lib
 */
var base_bower = "public/assets/bower/";


/**
 * Name of the angularjs app which is required for setting the templateCache
 * @type {string}
 */
var moduleName = "csApp";
/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */


var srcVendorJs = [
    base_bower + 'angular/angular*.min.js',
    base_bower + 'angular-translate/angular*.min.js',
    base_bower + 'angular-route/angular*.min.js',
    base_bower + 'angular-resource/angular*.min.js',
    base_bower + 'angular-collection/angular*.min.js',
    base_bower + 'jQuery/dist/*.min.js',
    base_bower + 'materialize/dist/js/*.min.js',
];




elixir(function(mix) {
    //mix.less('app.less');

    mix.task('vendorJs');
    mix.task('appJs');
    mix.task('appCss');
    mix.task('appView');

    mix.task('submodulesJs');
    mix.task('submodulesCss');



});


/*---------------------------
 |
 |
 |   Set the tasks
 |
 ----------------------------*/




// vendorJs
// Aimed at concatenating the vendors js file

gulp.task('vendorJs', function() {
    return gulp.src(srcVendorJs)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/assets/lib'));
});



// appJs

gulp.task('appJs', function() {
    return gulp.src(['resources/app/src/site/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('site.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/assets/lib'));
});


//appCss

gulp.task('appCss', function() {
    return gulp.src(['resources/app/src/site/**/*.css'])
        .pipe(sourcemaps.init())
        .pipe(concat('site.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/assets/lib'));
});


gulp.task('appView', function(){
    return gulp.src('resources/app/src/site/**/*.html')
        .pipe(templateCache("templates.js",{module:moduleName}))
        .pipe(gulp.dest('public/assets/lib'));
});


/**
 *
 * Submodules if using submodules with git
 * See reference to add submodules
 *
 */

gulp.task('submodulesJs', function() {
    return gulp.src(['resources/submodules/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('submodules.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/assets/lib'));
});

gulp.task('submodulesCss', function() {
    return gulp.src(['resources/submodules/**/*.css'])
        .pipe(sourcemaps.init())
        .pipe(concat('submodules.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/assets/lib'));
});


/*---------------------------
 |
 |
 |   Set the watch function
 |
 ----------------------------*/



gulp.task('watch', function () {


    gulp.watch(['resources/app/**/*.js'],['appJs']);
    gulp.watch(['resources/app/**/*.css'],['appCss']);

    gulp.watch(['resources/app/**/*.html'],['appView']);

    gulp.watch(['resources/submodules/**/*.js'],['submodulesJs']);
    gulp.watch(['resources/submodules/**/*.css'],['submodulesCss']);

});


//gulp.task('watch', function () {
// gulp.watch(['resource/app/site/*.js'],['csApp']);
//});

