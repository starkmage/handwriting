/* 
compose（从右到左）
*/

// 示例
const add1 = x => x + 1;
const mul2 = x => x * 10;
const composed = compose(add1, mul2); // 相当于 add1(mul2(x))

console.log(composed(3)); // 31

function compose(...fns) {
  return function(initialValue) {
    return fns.reduceRight((acc, fn) => {
      return fn(acc)
    }, initialValue)
  }
}


/* 
pipe（从左到右）
*/

function pipe(...fns) {
  return function (initialValue) {
    return fns.reduce((acc, fn) => fn(acc), initialValue);
  };
}

const piped = pipe(add1, mul2); // 相当于 mul2(add1(x))
console.log(piped(3)); // 40