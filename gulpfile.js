// Include gulp
var gulp = require('gulp');

// Include Plugins
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// Compile Our Sass
gulp.task('sass', function() {

	return gulp.src('assets/css/sass/**/*.scss')

	.pipe(sass({
		outputStyle: 'compressed'
	}).on('error', sass.logError))

	.pipe(autoprefixer({
		browsers: [
			'last 6 versions',
			'safari >= 5',
			'ie >= 8',
			'opera 12.1',
			'ios >= 6',
			'android >= 4',
			'firefox >= 20'
		]
	}))

	.pipe(gulp.dest('assets/css/'))
});

// Watch Files For Changes
gulp.task('watch', ['sass'], function() {
	gulp.watch('assets/css/sass/**/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['watch']);
