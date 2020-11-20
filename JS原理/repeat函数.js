/* 
fn为一个函数，times为执行次数，delay为执行时间间隔
*/
function repeat(fn, times, delay) {
  return function(...args) {
    let count = 0
    let timer = setInterval(() => {
      fn(...args)
      count++
      if (count === times) {
        clearInterval(timer)
      }
    }, delay)
  }
}

let f = repeat(console.log, 10, 1000)
f('---')