var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function () {
    gulp.src('')
        .pipe(webserver({
            // host: '192.168.0.18', 
            // port: '8080',
            livereload: true,
            directoryListing: false,
            open: true,
            fallback: 'src/index.html'
        }));
});