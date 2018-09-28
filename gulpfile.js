// 获取 gulp
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var del = require('del');
var changed  = require('gulp-changed');

// 压缩 js 文件
gulp.task( 'buildjs', function(){
    gulp.src( [ 'src/static/**/*.js','!src/static/topic/gcthao/hub.js','!src/static/test/*.js'] )
        .pipe(changed('static/'))
        .pipe(uglify({
            mangle: {
                //排除混淆关键字
                reserved: ['require' ,'exports' ,'module' ,'$','jQuery','import']
            }
        }))
        .on('error', function (err) {
            console.log('[Error]', err.toString());
        })
        .pipe( gulp.dest( 'static/'));
});
gulp.task( 'buildjs-s', function(){
    gulp.src( ['src/statics/**/*.js','!src/statics/assets/**/*.js'] )
        .pipe(changed('statics/'))
        .pipe(uglify({
            mangle: {
                //排除混淆关键字
                reserved: ['require' ,'exports' ,'module' ,'$','jQuery','import']
            }
        }))
        .on('error', function (err) {
            console.log('[Error]', err.toString());
        })
        .pipe( gulp.dest( 'statics/'));
});
gulp.task( 'buildcss', function(){
    gulp.src( [ 'src/static/**/*.css'] )
        .pipe(changed('static/'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .on('error', function (err) {
            console.log('[Error]', err.toString());
        })
        .pipe(gulp.dest( 'static/'))
});
gulp.task( 'buildcss-s', function(){
    gulp.src( [ 'src/statics/**/*.css','!src/statics/assets/**/*.css'] )
        .pipe(changed('statics/'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .on('error', function (err) {
            console.log('[Error]', err.toString());
        })
        .pipe(gulp.dest( 'statics/')  );
});
gulp.task( 'buildassets', function(){
    gulp.src( [ 'src/statics/assets/**/*'])
        .pipe(changed('statics/assets/'))
        .pipe(gulp.dest( 'statics/assets/'));
});
gulp.task( 'buildothers', function(){
    gulp.src( [ '!src/statics/assets/**/*','src/**/*.png','src/**/*.jpg','src/**/*.ico','src/**/*.gif','src/**/*.xls','src/**/*.xml','src/**/*.eot','src/**/*.svg','src/**/*.ttf','src/**/*.html','src/**/*.php','src/**/*.json','src/**/*.twig','src/**/*.txt','src/**/*.woff','src/**/*.swf' ])
        .pipe(changed('./'))
        .pipe(gulp.dest( './') );

});

gulp.task( 'cleana', function(cb){
    del(['static/**/*','statics/**/*'], cb)
});

gulp.task( 'debug', function(){
    gulp.src( [ '!node_modules/**/*','src/**/*'])
        .pipe(changed('./'))
        .pipe(gulp.dest( './')  );
});
gulp.task('build', ['buildjs','buildjs-s','buildcss','buildcss-s','buildassets','buildothers']);
gulp.task('debug', ['debug']);
gulp.task('clean', ['cleana']);