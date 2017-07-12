var gulp=require('gulp');
var htmlmin=require('gulp-htmlmin');
var sass = require('gulp-sass');
var cssmin=require('gulp-cssmin');

var path = {
  src: {
    html: '',
    js: ''
  }
  html: {
    src: 'dev/*.html',
    dest: 'dist'
  }
}

gulp.task("htmlmin",function(){
  gulp.src(path.html.src)
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest(path.html.dest))
});
// gulp.task('htmlmin',function(){
//   gulp.src('dev/contactus.html')
//       .pipe(htmlmin({collapseWhitespace: true}))
//       .pipe(gulp.dest('dist'))
// });
// gulp.task('htmlmin',function(){
//   gulp.src('dev/aboutus.html')
//       .pipe(htmlmin({collapseWhitespace: true}))
//       .pipe(gulp.dest('dist'))
// });
gulp.task('sass',function(){
  gulp.src('dev/assets/scss/mystyles.scss')
      .pipe(sass().on('error',sass.logError))
      .pipe(gulp.dest('dev/assets/css'))
});
gulp.task('cssmin',function(){
  gulp.src('dev/assets/css/mystyles.css')
      .pipe(cssmin())
      .pipe(gulp.dest('dist'))
});

gulp.task('default', ['htmlmin', 'sass', 'cssmin']);
gulp.task('dev')
gulp.task('build')
