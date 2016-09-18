'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import minifycss from 'gulp-minify-css';
import rename from 'gulp-rename';
import notify from 'gulp-notify';
import reload from 'gulp-livereload';
import connect from 'gulp-connect';
import uglify from 'gulp-uglify';
import jshint from 'gulp-jshint';
import concat from 'gulp-concat';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import babel from 'gulp-babel';
import watch from 'gulp-watch';
//ES6
import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';


gulp.task('sass', function() {
	return gulp.src('build/sass/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(sourcemaps.write('build/maps'))
	.pipe(rename({suffix: '.min'}))
	.pipe(connect.reload())
	.pipe(notify({
		message: 'sass!'
	}))
	.pipe(gulp.dest('assets/css'));
});
gulp.task('img', function () {
	return gulp.src('build/img/*')
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	}))
	.pipe(gulp.dest('assets/img'))
	.pipe(connect.reload())
	.pipe(notify({
		message: 'img`s!'
	}));
});
//server
gulp.task('server', function() {
	connect.server({
		root: '',
		livereload: true
	});
});
//html
gulp.task('html', function () {
	gulp.src('*.html')
	.pipe(connect.reload())
	.pipe(notify({
		message: 'html!'
	}));
});
//js
gulp.task('ES6', function () {
	var bundler = browserify({
		entries: 'build/js/my/app.js',
		debug: true
	});
	bundler.transform(babelify);

	bundler.bundle()
	.on('error', function (err) { console.error(err); })
	.pipe(source('app.js'))
	.pipe(buffer())
	.pipe(sourcemaps.init({ loadMaps: true }))
	.pipe(uglify()) 
	.pipe(rename({suffix: '.min'}))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('assets/js'))
	.pipe(connect.reload())
	.pipe(
		notify({ message: 'app.js' })
		);
});
/*
gulp.task('scripts', function() {
	return gulp.src('build/js/my/app.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(concat('app.js'))
	.pipe(gulp.dest('assets/js'))
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('assets/js'))
	.pipe(connect.reload())
	.pipe(notify({ message: 'app.js' }));
});*/

//watcher
gulp.task('watch', function () {
	gulp.watch(['*.html'], ['html']);
	gulp.watch(['build/js/my/*.js'], ['ES6']);
	gulp.watch(['build/sass/*.scss'], ['sass']);
	gulp.watch(['build/img/*'], ['img']);
});

gulp.task('default', ['server', 'watch']);



