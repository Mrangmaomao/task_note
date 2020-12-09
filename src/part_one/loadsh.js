const fp = require('lodash/fp')
// 数据：horsepower 马力，dollar_value 价格，in_stock 库存
const cars = [
    { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
    { name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
    { name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
    { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
    { name: 'Aston Martin One-77', horsepower: 750, dollar_value: 185000, in_stock: true },
    { name: 'Pagani Huayra', horsepower: 700, dollar_value: 130000, in_stock: true }
]
// work one
// 练习1：使用组合函数 fp.flowRight() 重新实现下面这个函数
let isLastInStock = function(cars){
    // 获取最后一条数据
    let last_car = fp.last(cars)
    // 获取最后一条数据的 in_stock 属性值
    console.log(fp.property('name', last_car),6666)
    return fp.prop('in_stock', last_car)
}
const tracea = fp.curry((t,v) => {
    console.log(t,v)
    return v;
})
let _average = function(xs){
    return fp.reduce(fp.add, 0, xs) / xs.length
}
const getDollarValue = (item) => fp.prop('dollar_value',item);
var aa = fp.flowRight(_average,fp.map(getDollarValue));
// console.log(aa(cars));
let _underscore = fp.replace(/\W+/g, '_');
const getDollarName = (arr,index) => fp.prop('name',arr[index])
const toLowerCase = s => s.toLowerCase();
var bb = fp.flowRight(_underscore,toLowerCase,getDollarName);
// console.log(bb(cars,1));
class Container {
    static of(value){
        return new Container(value)
    }
    constructor(value){
        this._value = value
    }
    map(fn){
        return Container.of(fn(this._value))
    }
}

class Maybe {
    static of(x){
        return new Maybe(x)
    }
    isNothing(){
        return this._value === null || this._value === undefined
    }
    constructor(x){
        this._value = x
    }
    map(fn){
        return this.isNothing() ? this : Maybe.of(fn(this._value))
    }
}
let maybe = Maybe.of([5,6,1])
// console.log(maybe)
// 练习1：使用 fp.add(x, y) 和 fp.map(f,x) 创建一个能让 functor 里的值增加的函数 ex1
let ex1 = (array) => {
    // 你需要实现的函数。。。
    let result = 0;
    fp.map((x) => {
        // console.log(x)
        result = fp.add(result,x);
    },array)
    return result;
}
var r = maybe.map(ex1);
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
// 练习2：实现一个函数 ex2，能够使用 fp.first 获取列表的第一个元素
let ex2 = (array) => {
    return fp.first(array)
}
// console.log(xs.map(ex2));
//练习3：实现一个函数 ex3，使用 safeProp 和 fp.first 找到 user 的名字的首字母
let safeProp = fp.curry(function(x, o){
    console.log(x,o)
    return Maybe.of(o[x])
})
let user = { id: 2, name: 'Albert' }
let ex3 = (user) => {
    var r = safeProp('name')(user).map((name) => fp.first(name));
    // 你需要实现的函数。。。
}
// 用 ex3 函数传入 user 对象，safeProp 是经过柯里化处理的，可以先传“属性”参数，后传“对象”参数。safeProp 函数处理后返回 user 的值，再调用fp.first 获取首字母
ex3(user)
// 使用 Maybe 重写 ex4，不要有 if 语句
let ex4 = function(n){
    n = Number(n) ? parseInt(n) : n;
    return n;
    
}
console.log(Maybe.of('aa').map(ex4))