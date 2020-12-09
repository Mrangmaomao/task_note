import { createImportSpecifier } from "typescript";

function sum(a: number, b:number){
    // a  number
    // b any
    return a + b;
}
console.log(sum(1,4));
function aa(arg:number[]){
    console.log(...arg);
}
aa([1,2,3]);
// const PostStatus = {
//     Draft: 0,
//     Unpublished: 1
// }
const enum PostStatus {
    Draft = 0,
    Unpublished = 1
}
function stringify(value: any){
    return  JSON.stringify(value)
}
let age = 18
// age ='aaa'
let age1;
age1 = 'aaa';
age1 = 180;
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
interface Cache{
    [prop:string]: string
}
const cache:Cache = {}
cache.aa = 'aaaa';
class Person{
    protected name: string
    private age: number
    protected readonly gender: boolean // 只能在子类中访问
    constructor(name: string,age: number){
        this.name = name;
        this.age = age;
    }
    sayHi(msg: string):void{
        console.log(`I am ${this.name}, ${msg}`)
    }
}
class Student extends Person {
    private constructor(name: string,age:number ){
        super(name, age);
        console.log(this.name, this.gender);
    }
}
// 类与接口
interface Eat{
    eat(food: string):void
}
interface Run{
    run(distance: number): void
}
class Person1 implements Eat, Run{
    eat(food: string): void{

    }
    run(distance: number): void{

    }
}
class Animal implements Eat, Run{
    eat(food: string): void{

    }
    run(distance: number): void{

    }
}
// 抽象类
abstract class Animal1 implements Eat, Run{
    eat(food: string): void{

    }
    run(distance: number): void{

    }
}
//abstract 只能继承不能调用
class Dog extends Animal1{
    run(distance: number){
        console.log(distance)
    }
}
//泛性

function createNumberArray(lenth : number, value: number): number[]{
    const arr = Array<number>(length).fill(value);
    return arr;

}

function createNumberArray1<T>(lenth : number, value: number): number[]{
    const arr = Array<number>(length).fill(value);
    return arr;

}
// 类型说明 引入第三方无typescript的文件需使用 declare
import {camelCase} from 'lodash';
declare function camelCase(input: string) : string;
const res = camelCase('hell typed');
