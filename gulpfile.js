var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-cssmin');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var pump = require('pump');
var fontmin = require('gulp-fontmin');
var imagemin = require('gulp-imagemin');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var del = require('del');
var runSequence = require('run-sequence');
var path = {
    sass: {
        src: 'dev/assets/scss/*.scss',
        dest: 'dist/assets/css'
    },
    css: {
        src: 'dev/assets/css/*.css',
        dest: 'dist/assets/css'
    },
    html: {
        src: 'dev/*.html',
        dest: 'dist'
    },
    js: {
        src: 'dev/assets/js/*.js',
        dest: 'dist/assets/js'
    },
    fonts: {
        src: 'dev/assets/fonts/**',
        dest: 'dist/assets/fonts'
    },
    img: {
        src: 'dev/assets/img/*',
        dest: 'dist/assets/img'
    }
}
gulp.task('serve', ['htmlmin', 'sass', 'imagemin'], function() {
    browserSync.init({
        //injectChanges: true,
        open: true,
        server: './dist'
    });
    gulp.watch([path.html.src, path.sass.src], ['htmlmin', 'sass', 'imagemin']);
    gulp.watch([path.html.src, path.sass.src]).on('change', browserSync.reload);
});
gulp.task("htmlmin", function() {
    gulp.src(path.html.src)
        .pipe(htmlmin())
        .pipe(gulp.dest(path.html.dest))
        .pipe(browserSync.stream({ stream: true }))
});
gulp.task('uglifyjs', function(cb) {
    pump([
            gulp.src(path.js.src),
            uglify(),
            gulp.dest(path.js.dest)
        ],
        cb
    );
});
gulp.task('imagemin', function() {
    gulp.src(path.img.src)
        .pipe(imagemin())
        .pipe(gulp.dest(path.img.dest))
});
gulp.task('sass', function() {
    gulp.src(path.sass.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(gulp.dest(path.sass.dest))
        .pipe(browserSync.stream({ stream: true }))
});
gulp.task('clean:dist', function() {
    return del.sync('dist');
})
gulp.task('watch', function() {
    gulp.watch(path.html.src, ['htmlmin'])
    gulp.watch(path.sass.src, ['sass'])
    gulp.watch(path.js.src, ['uglifyjs'])
    gulp.watch(path.img.src, ['imagemin'])
    gulp.watch(path.fonts.src, ['fontmin'])
});
gulp.task('build', function(callback) {
    runSequence('clean:dist', ['sass', 'htmlmin', 'uglifyjs', 'imagemin'])
});

gulp.task('default', ['htmlmin', 'sass', 'uglifyjs', 'imagemin', 'watch', 'serve']);
// gulp.task('dev', ['htmlmin', 'sass', 'fontmin,'watch']);