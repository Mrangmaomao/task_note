/**
 * 
 * @flow
 */
// function square(n:number){
//     return n * n
// }
// square(100);
const a: string = 'foobar';
const b: number = 3;
const arr1: Array<number> = [1,2,3];
const arr2: number[] = [1,2,3]
const foo:[string, number] = ['foo', 100];
const obj1: {
    foo: string,
    bar: number
} = {
    foo: 'aa',
    bar: 100
};
// const obj3 = {[string]: string} = {}
function foo1(callback:(string,number) => void){
    callback('string', 100)
}
const as: 'foo' = 'foo';
const type: 'success' | 'warning' = 'success';

const element: HTMLElement | null = document.getElementById('app');