const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');

// SASS INTO CSS W/ AUTOPREFIXING
gulp.task('sass', () => {
	return gulp.src('dev/styles/styles.scss')
		.pipe(sass().on('error', sass.logError)) // converts sass to css with gulp-sass
		.pipe(autoprefixer('last 2 versions'))
		.pipe(gulp.dest('public/styles/'))
		.pipe(reload({
			stream: true
		}))
});

// WATCHING FOR FILE CHANGES
gulp.task('watch', ['browser-sync'], () => {
	gulp.watch('dev/styles/**/*.scss', ['sass'])
	gulp.watch('*.html', reload);
	gulp.watch('dev/scripts/**/*.js', reload);
});

// BROWSER-SYNC / LIVE RELOADING
gulp.task('browser-sync', () => {
	browserSync.init({
		server: {
			baseDir: ''
		},
	})
});

// ES6 TO ES5
gulp.task('scripts', () => {
	gulp.src('dev/scripts/script.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('public/scripts/'))
		.pipe(reload({stream: true}));
});

// ALL TASKS INTO ONE INIT
gulp.task('default', ['browser-sync','sass', 'scripts', 'watch']);