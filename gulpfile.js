var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');
var watch = require('gulp-watch');
var shell = require('gulp-shell')
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

var paths = {
	'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json'],
	'style': {
		all: './public/styles/**/*.scss',
		output: './public/styles/'
	}
};

gulp.task('connect', function() {
	connect.server({
		root: '',
		livereload: true
	});
});

gulp.task('html', function () {
	gulp.src('./templates/**/*.jade')
    	.pipe(connect.reload());
});

gulp.task('watch:livereload', function () {
	gulp.watch(['*.*', './templates/**/*.jade', './public/styles/**/*.*'], ['html']);
});

// gulp lint
gulp.task('lint', function(){
	gulp.src(paths.src)
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));
});

// gulp watcher for lint
gulp.task('watch:lint', function () {
	gulp.watch(paths.src, ['lint']);
});

gulp.task('watch:sass', function () {
	gulp.watch(paths.style.all, ['sass']);
});

gulp.task('sass', function(){
	gulp.src(paths.style.all)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(paths.style.output));
});

gulp.task('runKeystone', shell.task('sudo node keystone.js'));
gulp.task('watch', [
	'watch:livereload',
//  	'watch:sass',
  //	'watch:lint'
]);

gulp.task('default', ['connect', 'watch', 'runKeystone']);
