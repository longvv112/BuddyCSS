'use strict';

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var rename       = require('gulp-rename');
var cssmin       = require('gulp-cssmin');
var jsmin        = require('gulp-jsmin');
var clean        = require('gulp-clean');
var concat       = require('gulp-concat');
var browserSync  = require('browser-sync');
var runSequence  = require('run-sequence');
var fileinclude  = require('gulp-html-extend');
var wait         = require('gulp-wait');
var babel        = require('gulp-babel');
var sourcemaps   = require('gulp-sourcemaps')



gulp.task('includes', function() {
  return  gulp.src(['src/*.html'])
    .pipe(fileinclude({
      annotations: false,
      verbose: false
    }))
    .pipe(gulp.dest('build'))
});

gulp.task('clean-build', function()
{
	return gulp.src('./build', {read: false}).pipe(clean());
});

gulp.task('reload', function() {
  return browserSync.reload();
});






/********** COMPILE SASS TO CSS AND MOVE TO BUILD FOLDER THEN MINIFY CSS *********/
gulp.task('sass', function () {
    return gulp.src('src/sass/import.scss')
      .pipe(sourcemaps.init())
      .pipe(wait(500))
    	.pipe(sass().on('error', sass.logError))
    	.pipe(rename('buddy.css'))
      .pipe(sourcemaps.write("."))
    	.pipe(gulp.dest('build/css'));
});

gulp.task('sass-header', function () {
    return gulp.src('src/sass/header.scss')
      .pipe(sourcemaps.init())
      .pipe(wait(500))
    	.pipe(sass().on('error', sass.logError))
    	.pipe(rename('buddy.header.css'))
      .pipe(sourcemaps.write("."))
    	.pipe(gulp.dest('build/css'));
});

gulp.task('concat-styles', function() {
    return gulp.src([
      'node_modules/@fortawesome/fontawesome-free/css/brands.css',
      'node_modules/@fortawesome/fontawesome-free/css/regular.css',
      'node_modules/@fortawesome/fontawesome-free/css/solid.css',
      'node_modules/@fortawesome/fontawesome-free/css/fontawesome.css'
      ])
      .pipe(sourcemaps.init())
      .pipe(concat('buddy.plugins.css'))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest('build/css'));
});

gulp.task('cssmin', function () {
   return  gulp.src(['build/css/buddy.css', 'build/css/buddy.plugins.css', 'build/css/buddy.header.css'])
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/css'));
});

gulp.task('clean-css', function()
{
	return gulp.src(['build/css/buddy.css', 'build/css/buddy.plugins.css', 'build/css/buddy.header.css'], {read: false})
      .pipe(clean());
});

gulp.task('styles', function() {
  runSequence('sass', 'sass-header', 'concat-styles', 'cssmin', 'reload');
});
/********** COMPILE SASS TO CSS AND MOVE TO BUILD FOLDER THEN MINIFY CSS *********/




/********** CONCAT JS, MINIFY AND DELETE THE UNMINIFIED THEN MOVE TO BUILD FOLDER **********/
gulp.task('concat-scripts', function() {
  	return gulp.src('src/js/*.js')
    	.pipe(concat('buddy.js'))
    	.pipe(gulp.dest('build/js'));
});

gulp.task('jsmin', function () {
   	return  gulp.src('build/js/buddy.js')
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/js'));
});

gulp.task('clean-js', function()
{
	return gulp.src('build/js/buddy.js', {read: false}).pipe(clean());
});

gulp.task("babel", function () {
  return gulp.src("src/js/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("buddy.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build/js"));
});

gulp.task('scripts', function() { //if you don't work with babel, just replace this task with 'concat-scripts'
  runSequence('babel', 'jsmin', 'reload');
});
/********** CONCAT JS, MINIFY AND DELETE THE UNMINIFIED THEN MOVE TO BUILD FOLDER **********/





/********** COPY IMG AND FONTS FILES FROM SRC TO BUILD **********/
gulp.task('copy-images', function() {
  return gulp.src('src/images/**').pipe(gulp.dest('build/images'));
});

gulp.task('copy-fontawesome', function() {
    return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/**').pipe(gulp.dest('build/webfonts'));
});

gulp.task('copy', function() {
  runSequence('copy-images', 'copy-fontawesome', 'reload');
});
/********** COPY HTML AND JS FILES FROM SRC TO BUILD **********/


/********** MAIN TASKS TO RUN **********/
gulp.task('serve', function() {
    browserSync({
        server: "build/"
    });

    gulp.watch('src/sass/*.scss', ['styles']);
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch(['src/*.html', 'src/includes/*.html'], function(){ runSequence('includes', 'reload') });
    gulp.watch(['src/images/*'], ['copy-images']);
});

gulp.task('default', function()
{
  runSequence('build', 'serve');
});


gulp.task('build', function() {
  runSequence('clean-build', 'copy', 'styles', 'scripts', 'includes');
});
/********** MAIN TASKS TO RUN **********/



/********** CREATION OF MENU **********/
gulp.task('sass-vertical-left-bar', function () {
    return gulp.src('src/menu/vertical-left-bar/header.scss')
      .pipe(sourcemaps.init())
      .pipe(wait(500))
    	.pipe(sass().on('error', sass.logError))
    	.pipe(rename('buddy.header.css'))
      .pipe(sourcemaps.write("."))
    	.pipe(gulp.dest('build/menu/vertical-left-bar'));
});

gulp.task('cssmin-vertical-left-bar', function () {
   return  gulp.src('build/menu/vertical-left-bar/buddy.header.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/menu/vertical-left-bar'));
});

gulp.task('copy-vertical-left-bar', function() {
  return gulp.src('src/menu/vertical-left-bar/index.html').pipe(gulp.dest('build/menu/vertical-left-bar/'));
});

gulp.task('sass-top-bar', function () {
    return gulp.src('src/menu/top-bar/header.scss')
      .pipe(sourcemaps.init())
      .pipe(wait(500))
    	.pipe(sass().on('error', sass.logError))
    	.pipe(rename('buddy.header.css'))
      .pipe(sourcemaps.write("."))
    	.pipe(gulp.dest('build/menu/top-bar'));
});

gulp.task('cssmin-top-bar', function () {
   return  gulp.src('build/menu/top-bar/buddy.header.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/menu/top-bar/'));
});

gulp.task('copy-top-bar', function() {
  return gulp.src('src/menu/top-bar/index.html').pipe(gulp.dest('build/menu/top-bar/'));
});

gulp.task('create-menu', function() {
  runSequence('sass-vertical-left-bar', 'cssmin-vertical-left-bar', 'copy-vertical-left-bar', 'sass-top-bar', 'cssmin-top-bar', 'copy-top-bar');
});
/********** CREATION OF MENU **********/
