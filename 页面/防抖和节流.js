//防抖函数
const debounce = (func, wait) => {
  let timer = 0
  return function(...args) {
    if (timer) clearTimeout(time)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

//节流函数
const throttle = (func, wait) => {
  let lastTime = 0
  return function(...args) {
    let now = new Date()
    if (now - lastTime > wait) {
      lastTime = now
      console.log(this);
      func.apply(this, args)
    }
  }
}

setInterval(
  throttle(() => {console.log('节流')}, 3000)
, 500);
