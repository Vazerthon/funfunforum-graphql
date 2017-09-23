import gulp from 'gulp';
import babel from 'gulp-babel';

gulp.task('build', () =>
  gulp
    .src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist')),
);

gulp.task('default', ['build']);
