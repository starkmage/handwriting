// 1.时间戳节流
function throttle(fn, wait) {
  let last = 0
  return function(...args) {
    let now = new Date()
    if (now - last > wait) {
      last = now
      fn.apply(this, args)
    }
  }
}

// 2.定时器节流
// 非立即执行的，最开始不会执行，wait后才会执行第一次
function throttle2(fn, wait) {
  let timer = 0
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = 0
      }, wait)
    }
  }
}

// 节流是控制与上次执行的时间间隔，而防抖是控制上次触发的时间间隔

// 使用
function fn() {
  console.log('节流测试');
}

setInterval(throttle(fn, 3000))