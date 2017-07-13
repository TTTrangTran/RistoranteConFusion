var gulp=require('gulp');
var htmlmin=require('gulp-htmlmin');
var sass = require('gulp-sass');
var cssmin=require('gulp-cssmin');
var jsmin=require('gulp-jsmin');
var fontmin=require('gulp-fontmin');
var watch=require('gulp-watch');
var watchSass=require('gulp-watch-sass');
var browserSync=require('browser-sync').create();
var path = {
  sass: {
    src:'dev/assets/scss/*.scss',
    dest:'dev/assets/css'
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
    dest:'dist/assets/fonts'
  }
}
gulp.task('serve',['htmlmin','sass'],function(){
  browserSync.init({
    //injectChanges: true,
    open:true,
    server: './dist'
  });
  gulp.watch([path.html.src,path.sass.src],['htmlmin','sass']);
  gulp.watch([path.html.src,path.sass.src]).on('change',browserSync.reload);
});
gulp.task("htmlmin",function(){
  gulp.src(path.html.src)
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest(path.html.dest))
      .pipe(browserSync.stream({stream:true}))
});

gulp.task('sass',function(){
  gulp.src(path.sass.src)
      .pipe(sass().on('error',sass.logError))
      //.pipe(cssmin())
      .pipe(gulp.dest(path.sass.dest))
      .pipe(browserSync.stream({stream:true}))
});
gulp.task('cssmin',function(){
  gulp.src(path.css.src)
      .pipe(cssmin())
      .pipe(gulp.dest(path.css.dest))
});
gulp.task("jsmin",function(){
  gulp.src(path.js.src)
      .pipe(jsmin({collapseWhitespace: true}))
      .pipe(gulp.dest(path.js.dest))
});
gulp.task("fontmin",function(){
  gulp.src(path.fonts.src)
      .pipe(fontmin({collapseWhitespace: true}))
      .pipe(gulp.dest(path.fonts.dest))
});
 gulp.task('watch',function(){
      gulp.watch(path.html.src,['htmlmin'])
      gulp.watch(path.sass.src,['sass','cssmin'])
 });
gulp.task('default', ['htmlmin','sass','cssmin','watch','serve']);
// gulp.task('dev', ['htmlmin', 'sass', 'cssmin','watch']);
//gulp.task('build');
