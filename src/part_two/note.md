
### 简单题
1. 谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值

    - 前端工程化是对整个前端代码进行系统化，模块化，规范化。解决了，规范代码风格，提高代码编码速度，测试，维护阶段的生产效率。
2. 你认为脚手架除了我们创建项目结构，还有什么更深的意义
    - 把脚手架例举为机器，程序员也可以指挥机器做最基础的事情了，脚手架可根据项目的实际情况来反复使用。为前端模块化，开发自动化，代码自动部署垫下良好的基础。
### 编程题
1. 概述脚手架实现的过程，并使用nodejs完成一个自定义的小型脚手架工具
    - 准备工作：
      1. 明确脚手架所需要的功能 ， 含 templates 里所有的文件
      2. 在脚手架中安装 ejs 模版插件，引入 inquirer 插件
      3. 将ejs所需要的变量写入templates相应的文件夹里面，例如 name
      4. 在package.json里面添入一行 lib，指向脚手架的js名字
    - 开发过程
      1. 利用inquirer插件的prompt进行对用户进行询问，例如文件名
      2. 取得答案之后，再去取得templates中的模版文件，进行遍历，
        1.  使用ejs.renderfile将答案替换ejs的变量名，
        2. 使用nodejs的模块fs.writefilesync 将结果写入目标文件

    - 测试过程
        1. 先使用本地测试，将当前文件进行yarn link到全局
        2. 创建一个新文件，尝试使用脚手架进行搭建一个新的文件
    - 部署过程
        1. 发包到npm publish
2. 尝试使用gulp完成项目的自动化构建
    - 准备工作
        1. 准备所需要的插件
            输出带有颜色 gulp-util
            压缩js gulp-uglify
            css gulp-less gulp-autoprefixer gulp-minify-css 
            压缩图片 gulp-imagemin
            监听文件 gulp-watch-path
            调试 gulp-sourcemaps
    - 开发工作
        1. 使用async的异步模式，将所准备的工作时的插件引入，
        2. 因为gulp是流的方式，读入 -》 更改 -》写入，所以在创建task的时候使用pipe需要一步一步的
        2. 将公共的css与js合并成一个文件
        3. 使用uglify进行压缩css或者js
        4. 在写入文件之前先清除原来目录下的文件
        5. 可使用maps来调试错误
        ```
            gulp.task('uglifyjs', function () {
                gulp.src('src/js/**/*.js')
                    .pipe(uglify())
                    .pipe(gulp.dest('dist/js'))
            })
        ```
    - 测试过程
        1. 监听文件 gulp.watch
        2. 启动开发环境的server 
        3. 将其写入脚手架中，再测试
    - 部署过程
        1. 发包到npm publish