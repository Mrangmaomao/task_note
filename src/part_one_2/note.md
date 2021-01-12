### es6
弱类型问题：
    1.必须等待运行阶段才会抛出异常
    2. 加法运算，
### 强类型优势：
    1. 语法阶段就会出错
### flow 插件 
    mixed 和 any 的类型
        any 弱类型
        mixed 强类型
    // https:www.saltycrane.com/cheat-sheets/flow-type/latest
    // https://github.com/facebook/flow/blob/master/lib/core.js
    // https://github.com/facebook/flow/blob/master/lib/dom.js
    // https://github.com/facebook/flow/blob/master/lib/bom.js
    // https://github.com/facebook/flow/blob/master/lib/cssom.js
    // https://github.com/facebook/flow/blob/master/lib/node.js
### TYPESCRIPT
    - 原型数据类型
        string 
        number
        boolean
        void // 只能存放null or undefined ，严格模式下只能是 undefined
        null
        undefined
        symbol

    - 引入标准型库
        tsconfig.json 
             "lib": ["es2015", "ES2016","DOM","ES2017"]

    - 作用域问题
        export
    - object    
        泛指所有的c语言对象
    - 数组类型
        const arr1: Array<number> = [1, 2, 3];
        const arr2: number[]  = [1, 2, 3]
        function(arg: number[]){}
    - 元组类型
        const tuple: [number, string] = [18, 'zce']
    - 枚举 enum
        ```
            enum PostStatus {
                Draft = 0,
                Unpublished = 1
            }
        ```
    - 常量枚举
        ```
        const enum PostStatus {
            Draft = 0,
            Unpublished = 1
        }
        ```
    > 函数类型
        rest
    - 任意类型
     any 
    - 隐式类型判断
        let age = 18
        // age ='aaa'
        let age1;
        age1 = 'aaa';
        age1 = 180; 
    - 类型断言
        const num = res as number
        const num1 = <number>res // jsx 下不能使用
    - interface 接口
        ```
            interface Post{
                title: string
                readonly content:string  // readonly//
                age?: number
            }
            function printPost(post: Post){
                console.log(post.title);
                console.log(post.content)
            }
            printPost({
                title: 'aaa',
                content: 'aaa',
                // age:18
            })
            // 任意string成员
            interface cache{
                [prop:string]: string
            }
        ```
### javascript 性能优化
    1. 内存管理
    2. 垃圾回收
        就是 中内存管理是自动的
        对象不再被引用时是垃圾

    3. 可达对象
        可以访问到的对象是可达对象（引用，作用域）
    - gc算法
      gc是一种机制，垃圾回收器完成具体的工作，工作的内容就是查找垃圾释放空间，回收空间
      算法就是工作时查找和回收所遵循的规则
        1. 引用记数
            核心思想： 设置引用数，判读当前引用数是否为0，引用字数为0时立即回收。
            优：
                1.发现垃圾时立即回收
                2.最大限度减少程序暂停
            缺
                1.无法回收循环引用的对象
                2.时间开销大
        标记清除
            核心思想： 分标记清除二哥阶段完成，遍历所有对象找标记活动对象，遍历所有对象清除没有标记对象，回收相应的空间
            优： 可回收循环引用的对象
            缺
                空间碎片化，不能使空间得到最大化的使用
        标记整理
            优：
            
        分代回收
