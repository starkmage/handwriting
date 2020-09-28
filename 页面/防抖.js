function debounce(fn, wait) {
  let timer = 0
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
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