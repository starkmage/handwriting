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

// 使用
function fn() {
  console.log('节流测试');
}

setInterval(throttle(fn, 3000))