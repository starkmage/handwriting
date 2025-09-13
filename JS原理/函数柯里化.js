// 力扣2632
// 柯里化用大白话来说就是只传递给函数一部分参数来调用它，让它返回一个新函数去处理剩下的参数
var curry = function(fn) {

    return function curried(...args) {
      if (args.length >= fn.length) {
        return fn.apply(this, args)
      } else {
        return curried.bind(this, ...args)
      }
    }
};
/* 
实现下面的代码
sum(1,2)(2)() = 5
sum(3)(3)() = 6
*/

function sum(...args) {
  let x = args.reduce((prev, val) => prev + val)
  return function(...args2) {
    if (args2.length === 0) return x
    let y = args2.reduce((prev, val) => prev + val)
    return sum(x + y)
  }
}


function fn(a, b, c, d) {
  return a + b + c + d
}

let c = currying(fn)

console.log(c(1));