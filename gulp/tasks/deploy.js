var gulp = require('gulp');
var ftp = require('vinyl-ftp');
var minimist = require('minimist');
var gutil = require('gulp-util');
var args = minimist(process.argv.slice(2));

gulp.task('deploy', function() {
  var remotePath = '/';

  /* TODO: add credentials for online conference  */

  var conn = ftp.create({
    host: 'gold.elastictech.org',
    user: args.user,
    password: args.password,
    log: gutil.log,
    parallel: 2,
  });

  gulp.src(['./build/css/appe2c31e.css']).pipe(conn.dest('/css'));
  gulp.src(['./build/js/app5beb41.js']).pipe(conn.dest('/js'));
  gulp.src(['./build/index.html']).pipe(conn.dest(remotePath));
  gulp.src(['./build/test.html']).pipe(conn.dest(remotePath));

  // // Always deploy HTML
  // gulp.src(['./build/*.*']).pipe(conn.dest(remotePath));

  // // Always deploy CSS
  // gulp.src(['./build/css/**/*.*']).pipe(conn.dest('/css'));

  // // Always deploy JS
  // gulp.src(['./build/js/**/*.*']).pipe(conn.dest('/js'));

  // // Compare size of other files before deploy
  // gulp
  //   .src([
  //     './build/**/*.*',
  //     '!./build/*.*',
  //     '!./build/css/**/*.*',
  //     '!./build/js/**/*.*',
  //   ])
  //   .pipe(conn.differentSize(remotePath))
  //   .pipe(conn.dest(remotePath));
});
