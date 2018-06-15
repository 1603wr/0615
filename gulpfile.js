var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var fs = require('fs');
var path = require('path');
var url = require('url');
//压缩css
var clean = require('gulp-clean-css');
//添加内核
var autoprefixer = require('gulp-autoprefixer');
//压缩js
var ug = require('gulp-uglify');
//压缩html
var yh = require('gulp-htmlmin');
//引入数据
var mork = require('./mork/'); //默认会加载mork下的index.js
//把数据取过来
var jsons = mork('/api/json');
//console.log(mork('/api/json'))

//编译sass 压缩css 添加内核
gulp.task('sass', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(clean())
        .pipe(gulp.dest('dist/css'))
});
gulp.task('wat', function() {
    gulp.watch('src/scss/*.scss', ['sass'])
});
//压缩js
gulp.task('ug', function() {
        gulp.src(['src/js/**/*.js'])
            .pipe(ug())
            .pipe(gulp.dest('dist/js'))
    })
    //压缩HTML
gulp.task('yh', function() {
    gulp.src(['src/*.html'])
        .pipe(yh({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest('dist'))
})
gulp.task('yh1', function() {
    gulp.src(['src/page/*.html'])
        .pipe(yh({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest('dist/page'))
})



//起服务
gulp.task('server', function() {
    gulp.src('dist')
        .pipe(server({
            port: 6060,
            open: true,
            host: 'localhost',
            livereload: true,
            middleware: function(req, res, next) {
                if (req.url === '/favicon.ico') {
                    return false;
                }
                var pathname = url.parse(req.url).pathname;
                pathname = pathname === '/' ? '/index.html' : pathname;
                var que = url.parse(req.url, true).query;
                if (/\/api\//.test(pathname)) {
                    if (pathname == '/api/data') {
                        que.info = false;
                        que.address = decodeURIComponent(que.address)
                        que.cause = decodeURIComponent(que.cause)
                        que.datetime = Number(que.datetime)
                            // console.log(que)
                        jsons.data.unshift(que)
                        fs.writeFileSync('./mork/data.json', JSON.stringify(jsons))
                        res.end('{"result":"1"}')
                    }
                    res.end(JSON.stringify(mork(pathname))) //这里传pathname就行,因为相当于api/json
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'dist', pathname)))
                }


            }
        }))
});

gulp.task('default', ['wat', 'server'])