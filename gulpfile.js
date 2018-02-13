var gulp					=	require('gulp'),
		sass					=	require('gulp-sass'),
		browserSync		=	require('browser-sync'),
		concat				=	require('gulp-concat'),
		uglifyJs			=	require('gulp-uglifyjs'),
		cssNano				=	require('gulp-cssnano'),
		rename				=	require('gulp-rename'),
		autoprefixer	=	require('gulp-autoprefixer'),
		del 					=	require('del');

gulp.task('sass', function() {
	return gulp.src('src/sass/**/*.sass')
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(autoprefixer(['last 15 versions'], {cascade: true}))
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('min-css', ['sass'] , function() {
	return gulp.src([
		'src/css/libs.css',
		'src/css/main.css',
		'src/css/media.css',
		'src/css/page.css',
		'src/css/blogpost.css',
		'src/css/blog.css',
		])
	//return gulp.src('src/css/styles.css')
	.pipe(cssNano({ minifyFontValues: false, discardUnused: false }))
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('src/css'));
});

gulp.task('min-js', function() {
	return gulp.src([
			'src/libs/jquery/dist/jquery.min.js',
			'src/libs/slick-carousel/slick/slick.js',
		])
	.pipe(concat('libs.min.js'))
	.pipe(uglifyJs())
	.pipe(gulp.dest('src/js'));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'src'
		}
	});
});

gulp.task('watch', ['browser-sync'], function() {
	gulp.watch('src/sass/**/*.sass', ['min-css']);
	gulp.watch('src/js/**/*.js', browserSync.reload);
	gulp.watch('src/**/*.html', browserSync.reload);
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('build', ['clean', 'min-css', 'min-js'], function() {
	var buildCss = gulp.src([
			'src/css/libs.min.css',
			'src/css/main.min.css',
			'src/css/media.min.css',
			'src/css/page.min.css',
			'src/css/blog.min.css',
			'src/css/blogpost.min.css',
		])
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('src/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

	var buildFonts = gulp.src('src/img/**/*')
	.pipe(gulp.dest('dist/img'));

	var buildJs = gulp.src('src/js/**/*')
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('src/*.html')
	.pipe(gulp.dest('dist'));
});
