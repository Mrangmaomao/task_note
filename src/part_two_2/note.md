### Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。
    答：
        主要环节： 
            webpack主要流程环节有，分析代码，转换代码，编译代码，压缩代码
        打包过程
            1.初始化参数
                合并shell传入webpack.config.js并解析webpack.config.js中的配置参数，形成最后的配置结果。
            2.进行编译
                从第一步中得到compiler对象，注册所有配置的插件，插件监听webpack构建生命周期的节点，并执行对象的run方法进行编译
            3. 从配置文件中找到入口，开始构建ast语法树，找出依赖，递归下去
            4. 编译模块
                使用配置loader对文件进行转换，直到最后一个loader结束
            5.完成上述步骤后，根据入口配置生成代码块chunk，根据output输出所有的chunk到相应的目录
### Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
    * loader： 是一个转换器，可以将a文件转换为b文件，单纯的文件转换过程，webpack本身支持js 和 json两种格式文件，对于其他文件需要通过loader将其转换为commonjs规范的文件后，web pack才能解析到
    * plugin： 是一个扩展器，它丰富了web pack本身，针对是loader结束后，web pack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听web pack打包过程中的某些节点，执行广泛的任务
    * 开发plugin
        1. 一个javascript函数
        2. 在插件函数的原型（prototype）上定义了一个apply方法
        3. 指定一个绑定到web pack自身的时间钩子
        4. 处理web pack内部实例的特定数据
        5. 功能完成后调用web pack提供的回调
    * 开发loader
        1. 创建 export.module导出一个函数，
        2. 函数输入操作资源，输入加工后的结果，可以输入标准的js代码，让打包结果的代码正常执行，输出处理结果，交给下一个loader进一步处理成js代码 

# 编程题思路
    1. 项目分层明确，一个common.js,一个开发使用dev,生产模式production。使用命令webpack --config配置对其进行分配。
    2. 安装依赖与插件，css,less,js，png等依赖，安装分离vue中的css插件 ExtractTextPlugin
    3. 配置打包规则，例如less， 需要先配置less-loader 再配置 css-loader
    4. 配置代码检查loader eslint-loader
    5. 打包公共文件在一个文件中，设置map
    6. 开发环境使用webpack-devserve起本地环境
    
