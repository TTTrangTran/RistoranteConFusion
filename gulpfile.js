var gulp=require('gulp');
var htmlmin=require('gulp-htmlmin');
var sass = require('gulp-sass');
var cssmin=require('gulp-cssmin');
var watch=require('gulp-watch');
var path = {
  sass: {
    src:'dev/**/scss/*.scss',
    dest:'dev/**/css'
  },
  css: {
     src: 'dev/**/*.css',
     dest: 'dev/**/css'
  },
  html: {
    src: 'dist/*.html',
    dest: 'dev'
  }
}

gulp.task("htmlmin",function(){
  gulp.src(path.html.src)
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest(path.html.dest))
});

gulp.task('sass',function(){
  gulp.src(path.sass.src)
      .pipe(sass().on('error',sass.logError))
      .pipe(gulp.dest(path.sass.dest))
});
gulp.task('cssmin',function(){
  gulp.src(path.css.src)
      .pipe(cssmin({collapseWhitespace: true}))
      .pipe(gulp.dest(path.css.dest))
});
// gulp.task('watch',function(){
//   gulp.watch(path.html.src,['htmlmin'])
// });

gulp.task('default', ['htmlmin', 'sass', 'cssmin']);
// gulp.task('dev', ['htmlmin', 'sass', 'cssmin','watch']);
gulp.task('build')
