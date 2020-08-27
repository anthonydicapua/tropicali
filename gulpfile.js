var gulp = require("gulp")
var sass = require("gulp-sass")
var cleanCss = require("gulp-clean-css")
var sourcemaps = require("gulp-sourcemaps")
var browserSync = require('browser-sync').create()
var imagemin = require('gulp-imagemin')

var runSass = function () {
  // we want to run "sass css/app/scss app.css --watch"
  return gulp.src("src/css/app.scss")
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(
          cleanCss({
              compatibility: 'ie8'
          })
          )
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("dist"))
      .pipe(browserSync.stream())
}

var live = function () {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    })
    gulp.watch("src/*.html", html)
        .on('change', browserSync.reload)

    gulp.watch("src/css/*.scss", runSass)
}

var html = function () {
    return gulp.src("./src/*.html")
      .pipe(gulp.dest('dist'))
}

gulp.task("fonts", function () {
    return gulp.src("src/fonts/*")
    .pipe(gulp.dest("dist/fonts"))
})

gulp.task("images", function () {
    return gulp.src("src/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
})




exports.sass = runSass
exports.default = gulp.series(html, runSass, ["fonts"], ["images"], live)