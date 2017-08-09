/**
 * (C) 2016-2017 printf.jp
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
        './src/**/*.ts'
    ];

    const tsProj = typescript.createProject('./tsconfig.json');

    gulp.src(src)
        .pipe(tsProj())
        .pipe(gulp.dest('./app/js'));
});

gulp.task('default', ['build']);
