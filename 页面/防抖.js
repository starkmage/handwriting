// 1.普通防抖
function debounce(fn, wait) {
  let timer = 0
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}


// 2. 需要立即执行的防抖
// 和上面不同之处在于，在定时时间之后，只要触发就会立即执行（第一种是要等待 wait 时长触发），然后至少在 wait 之后才能进行下次触发
// 比如对一个按钮点击进行防抖，1是点击以后3秒内没有再点击，才触发事件，2是点击后立即触发事件，但是3秒内再点击无效，最后一次点击的3秒后再次点击立即触发
function debounce2(fn, wait, immediate) {
  let timer = 0
  return function(...args) {
    // clear 只会把定时器事件取消，但是 timer 仍然有值
    if (timer) clearTimeout(timer)
    if (immediate) {
      let callNow = !timer
      timer = setTimeout(() => {
        timer = 0
      }, wait)
      if (callNow) fn.apply(this, args)
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, wait)
    }
  }
}

// 使用
function fn() {
  console.log('防抖函数使用');
}

// 不断点击按钮，只有在3秒内没有点击才会响应
var ele = document.getElementById('bt')
ele.addEventListener('click', debounce(fn, 3000))

/* var body = document.body
body.style.height = '2000px'
window.addEventListener('scroll', debounce(fn, 3000)) */