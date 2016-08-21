/**
 * (C) 2016 printf.jp
 */
var gulp =       require('gulp');
var typescript = require('gulp-typescript');

/**
 * ビルド
 */
gulp.task('build', function ()
{
    var src =
    [
//      '!./node_modules/**',
        './src/**/*.ts'
    ];

    var tsOptions =
    {
        target: 'es6',
        module: 'commonjs'
    };

    gulp.src(src)
        .pipe(typescript(tsOptions))
        .pipe(gulp.dest('./app/js'));
});

gulp.task('default', ['build']);
