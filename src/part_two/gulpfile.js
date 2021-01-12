// delete files
const del = require('del');
const {src, dest, parallel, series, watch } = require('gulp'); 
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const DEV = !(process.env.NODE_ENV === 'production');
const path = require('path');
// gulp-less gulp-autoprefixer gulp-minify-css
const gulpUtil = require('gulp-util'),
      gulpLess = require('gulp-less'),
      gulpAutoprefixer = require('less-plugin-autoprefix'),
      gulpUglify = require('gulp-uglify'),
      minifyCSS = require('gulp-minify-css'),
      htmlMin = require('gulp-htmlmin'),
      htmltpl = require('gulp-html-tpl'),   // 引用html模板
      artTemplate = require('art-template'), // 模板渲染
      gulpSourcemaps = require('gulp-sourcemaps'); // gulp utils
const delFunc = () => del(['dist']);
// 创建服务
// js
const jsTask = (cb) => {
    return src('src/js/*.js')
    // 转义
    .pipe(babel())
    // 压缩
    .pipe(gulpUglify())
    .pipe(gulpSourcemaps.write('/.maps'))
    .pipe(dest('temp/js'))
    .pipe(browserSync.reload({stream: true}))
    // cb()
}
// less
const lessTask = () => {
    return src('src/less/*.less')
        .pipe(gulpLess({
            plugins:[gulpAutoprefixer]
        }))
        .pipe(minifyCSS())
        .pipe(dest('temp/css'))
        .pipe(browserSync.reload({stream: true}))
}
//img
const htmlTask = () => {
    return src('src/**.html')
    .pipe(htmltpl({
        tag: 'template',
        engine: function(template, data) {
            return template && artTemplate.compile(template)(data);
        },
        cache: false,
        data: {      //初始化数据
            name: 'hello world',
            g2: false
        }
    }))
    
    .pipe(dest('temp'))
} 
const build = series(
    delFunc,
    parallel(
        jsTask,
        lessTask,
        htmlTask,
        useref
    )
)
const server = () => {
    watch('src/less/*.less', lessTask);
    watch('src/js/*.js', jsTask);
    watch('src/*.html',htmlTask).on('change', browserSync.reload);
    browserSync.init({
        notify: false,
        port: 3000,
        files:'temp/**',
        server: {
            baseDir: ['temp','src','public'], //提升效率
            routes: {
                // '/aa': '/src/index1.html'
            }
        }
    })
}
// 合并js
const useref = () => {
    return src('dist/*.index.html',{base: 'dist'})
        .pipe(plugins.useref({searchPath:['dist','.']}))
        .pipe(plugins.if(/\.js$/, plugins.uglify()))
        .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
        .pipe(plugins.if(/\.html$/, plugins.htmlMin({
            collapseWhitespace: true,
            minifyCSS:true,
            minifyJs: true
        })))
        .pipe(dest('dist'))
}

const content = parallel(lessTask,jsTask,htmlTask); 
const start = series(delFunc,content, server)
module.exports = {
    start,
    build,
};
