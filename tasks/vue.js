import gulp from 'gulp'
import vueify from 'gulp-vueify'

gulp.task('vue', function () {
  return gulp.src('app/components/**/*.vue')
    .pipe(vueify())
    .pipe(gulp.dest('app/components/'))
})
