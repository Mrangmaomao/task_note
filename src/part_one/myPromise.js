/**
 *  实现方式
 *  1. 传递一个执行期器进去
 *  2. 判断执行器里面的成功或者失败或者等待
 *  3. 异步执行操作处理
 *  4. then 函数来链式调用余下的操作
 *  5. then 链式调用
 *  6. all 的实现
 *  7. finally 
 * 
 * * */
/**
 *  状态
 * 
 * **/
const STATUS = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
}
class MyPromise{
    constructor(executor){
        // crotorl
        this.init();
        try{
            executor(this.resolve,this.reject);
        }catch(e){
            this.reject(e)
        }
        
    }
    /**
     * @title 初始化函数
     * @return {viod}
     * @description {
     *      1. 所有初始化动作在此执行
     *      
     * }
     * * */
    init(){
        this.status = STATUS.PENDING;
        // 成功后的值
        this.value = undefined;
        // 失败之后的原因
        this.reason = undefined;
        // 成功回调
        this.successCallback = [];
        // 失败回调
        this.failCallback = [];
    }
    /**
     * @title 成功往下调用函数
     * @return 
     * @description {
     *   使用箭头函数保持this指向，
     *   将状态改为成功   
     *  
     * }
     * * */
    resolve = (value = '') => {
        console.log(this.successCallback,value);
        if(this.status !== STATUS.PENDING ){
            return;
        }
        
        this.status = STATUS.FULFILLED;
        this.value = value;
        // this.successCallback && this.successCallback();
        while(this.successCallback.length) this.successCallback.shift()();
        
    }
    /**
     * @title 失败执行调用函数
     * @return { fn }
     * @description {
     *      使用箭头函数保持this指向
     * }
     * * */
    reject = (reason = '') => {
        if(this.status !== STATUS.PENDING ){
            return;
        }
        this.reason = reason;
        this.status = STATUS.REJECTED;
        // this.failCallback && this.failCallback();
        while(this.failCallback.length) this.failCallback.shift()();
    }
    /**
     * @title 下一步函数，定义在原型中
     * @return { promise }
     * @description {
     *      1. 异步操作处理
     * }
     * * */
    then(successCallback,failCallback){
        let _this = this;
        successCallback = successCallback ? successCallback : value => value;
        failCallback = failCallback ? failCallback : reason => {throw reason};
        // 判断状态
        let promise2 = new MyPromise((resolve,reject) => {
            if(this.status === STATUS.FULFILLED){
                // 变成异步
                try{
                    setTimeout(function(){
                        // success
                        let x = successCallback(_this.value);
                        _this.resolvePromise(promise2,x, resolve, reject);
                    },0)
                }catch(e){
                    reject(e);
                }
            } else if(this.status === STATUS.REJECTED){
                // reject(this.reason);
                // failCallback(this.reason);
                // 变成异步
                try{
                    setTimeout(function(){
                        let x = failCallback(_this.reason);
                        _this.resolvePromise(promise2,x, resolve, reject);
                    },0)
                }catch(e){
                    reject(e);
                }
            } else {
                // wait status
                this.successCallback.push(() => {
                    try{
                        setTimeout(function(){
                            // success
                            let x = successCallback(_this.value);
                            _this.resolvePromise(promise2,x, resolve, reject);
                        },0)
                    }catch(e){
                        reject(e);
                    }
                });
                this.failCallback.push(() => {
                    try{
                        setTimeout(function(){
                            let x = failCallback(_this.reason);
                            _this.resolvePromise(promise2,x, resolve, reject);
                        },0)
                    }catch(e){
                        reject(e);
                    }
                });
            }
        }) 
        return promise2;
    }
     /**
     * @title 判断器，
     * @return { viod }
     * @description {
     *      判断返回是否为promise，如果是则调用then，否则返回resolve
     *      判断值是否为promise对象，或者为自己
     * }
     * * */
    resolvePromise(promise2, x,resolve, reject){
        if(promise2 === x){
            // 返回自己
            return reject(new TypeError("chian is cyle"))
        }
        if(x instanceof MyPromise){
            x.then(resolve, reject);
        } else {
            resolve(x);
        }
    }
     /**
     * @title all 方法
     * @param {array}
     * @return { viod }
     * @description {
     *      判断返回是否为promise，如果是则调用then，否则返回resolve
     *      判断值是否为promise对象，或者为自己
     * }
     * * */
    static all(array){
        let result = [];
        let index = 0;
        
        return new MyPromise((resolve, reject) => {
            for(var i = 0 ; i < array.length; i++){
                var current = array[i];
                if(current instanceof MyPromise){
                    // promise
                    current.then(value => addData(i,value),reason => reject(reason));
                } else {
                    // 普通值
                    addData(i,array[i]);
                }
            }
            function addData(key, value){
                result[key] = value;
                index++;
                if(index === array.length){
                    resolve
                }
                resolve(result)
            }
        })
        
    }
    /**
     * @title resolve 方法
     * @param {promise || anything}
     * @return { promise }
     * @description {
  
     * }
     * * */
    static resolve(value){
        if(value instanceof MyPromise) return value;
        return new MyPromise(resolve => resolve(value));
    }
    finally(callback){
        this.then((value)=> {
            return MyPromise.resolve(callback()).then(() => value);
            // return value;
        },reason => {
            callback();
            return MyPromise.resolve(callback()).then(() => {throw reason});
  
        })
    }
    catch (failCallback){
        return this.then(undefined, failCallback);
    }
}

var p = new MyPromise((resolve,reject) => {
    // console.log(333);
    resolve(100);
})
console.log(p.then, 9999)
p.then((value) => {
    console.log(444);
    console.log(value)
})
// .then(() => {
//     console.log(555)
// })
MyPromise.resolve(100).then(function(v){
    console.log(v,999)
})
setTimeout(function() {
    var a = 'hello'
    setTimeout(function() {
        var b = 'lagou'
        setTimeout(function() {
            var c = 'I ❤️ U'
            console.log(a + b + c)
        }, 10);
    }, 10);
}, 10);

let isLastInStock = function(cars){
    // 获取最后一条数据
    let last_car = fp.last(cars)
    // 获取最后一条数据的 in_stock 属性值
    return fp.prop('in_stock', last_car)
}
